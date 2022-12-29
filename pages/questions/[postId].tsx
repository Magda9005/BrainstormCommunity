import { useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import styles from "../../components/modules/OpenQuestionPage.module.scss";
import OpenQuestion from "../../components/OpenQuestion";
import {
  getAuthorName,
  getAuthorAvatar,
  getTags,
  getSinglePost,
  getUserPostsQuantity,
  jsonFetch,
  handleSubmitVote,
  handleUpdateThumbsUp,
  handleUpdateThumbsDown,
  commentAlreadyVotedByUser,
  getCommentsIdsLikedByUser,
  getCommentsIdsUnlikedByUser,
  checkIfAlreadyLiked,
  checkIfAlreadyUnliked,
  removeThumbUp,
  removeThumbDown,
} from "../../helperFunctions";
import SuggestionForm from "../../components/SuggestionForm";
import CommentListItem from "../../components/CommentsListItem";
import RightPanel from "../../components/RightPanel";
import useWindowSize from "../../useWindowSize";
import { postsApi, usersApi } from "../../env_variables";
import { NextPage, GetServerSideProps } from "next";
import { Post, Upvote, Comment } from "../../interfaces";
import { commentsApi } from "../../env_variables";
import { useRouter } from "next/router";

interface OpenQuestionPageProps {
  post: Post;
  authorName: string;
  authorAvatar: string;
  commentsAuthor: string;
  commentsAuthorAvatar: string;
  upvotes: Upvote[];
  userPostsQuantity: number;
  comments: Comment[];
  commentsIdsLikedByUser: number[];
  commentsIdsUnlikedByUser: number[];
}

const OpenQuestionPage: NextPage<OpenQuestionPageProps> = ({
  comments,
  post,
  authorName,
  authorAvatar,
  commentsAuthor,
  commentsAuthorAvatar,
  upvotes,
  userPostsQuantity,
  commentsIdsLikedByUser,
  commentsIdsUnlikedByUser,
}) => {
  const { data: session, status } = useSession();
  const [commentContent, setCommentContent] = useState("");
  const windowSize = useWindowSize();
  const userEmail = session?.user.email;
  const [route, setRoute] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  const [postComments, setPostComments] = useState(comments);
  const router = useRouter();

  const refresh = () => {
    return router.replace(router.asPath);
  };

  const handleOnChange = (value) => {
    setCommentContent(value);
  };

  const handleAddCommentToDb = async (
    postId: number,
    author: string,
    content: string,
    avatar: string
  ) => {
    const response = await fetch(`${commentsApi}`, {
      method: "POST",
      body: JSON.stringify({ postId, author, content, avatar }),
      headers: {
        "Content-type": "application/json",
      },
    });

    //once the comment is added to database, I 'refresh' getServerSideProps to get the comments from db and I set comments as state
    if (response.status < 300) {
      refresh();
      setPostComments(comments);
    }

    return response;
  };

  return (
    <>
      <Navbar
        userLoggedIn={status === "authenticated"}
        onClick={() => signOut()}
      />
      <div className={styles.sidebarAndMainLayoutContainer}>
        <Sidebar
          value={searchedWord}
          onChange={(e) =>
            setSearchedWord((e.target as HTMLInputElement).value)
          }
          action={`/questions/search/${route}`}
          onSubmit={() => setRoute(searchedWord.toLowerCase().trim())}
        />
        <div className={styles.questionAndCommentsContainer}>
          <OpenQuestion
            avatar={authorAvatar}
            authorName={authorName}
            date={post.createdAt}
            title={post.title}
            text={post.content}
            tags={getTags(post.tags)}
            onClick={() =>
              handleSubmitVote(post.id, session?.user.email, upvotes)
            }
          />
          <span className={styles.suggestions}>Suggestions</span>
          <SuggestionForm
            commentContent={commentContent}
            onChange={handleOnChange}
            onClick={() => {
              //1. setting UI optimistically:
              setPostComments([
                ...postComments,
                {
                  postId: post.id,
                  author: commentsAuthor,
                  content: commentContent,
                  authorImage: commentsAuthorAvatar,
                },
              ]);
              //2.execute function handleAddCommentToDb
              handleAddCommentToDb(
                post.id,
                commentsAuthor,
                commentContent,
                commentsAuthorAvatar
              );
            }}
          />

          {comments.map((comment) => (
            <CommentListItem
              key={comment.id}
              avatarUrl={comment.authorImage}
              authorName={comment.author}
              date={comment.createdAt}
              commentContent={comment.content}
              thumbsUp={comment.upvotesCount}
              thumbsDown={comment.downvotesCount}
              commentAlreadyVotedByUser={() =>
                checkIfAlreadyLiked(commentsIdsLikedByUser, comment.id)
              }
              addThumbUp={() =>
                handleUpdateThumbsUp(comment.id, userEmail, refresh)
              }
              addThumbDown={() =>
                handleUpdateThumbsDown(comment.id, userEmail, refresh)
              }
              checkIfAlreadyLiked={() =>
                checkIfAlreadyLiked(commentsIdsLikedByUser, comment.id)
              }
              removeThumbUp={() =>
                removeThumbUp(comment.id, userEmail, refresh)
              }
              checkIfAlreadyUnliked={() =>
                checkIfAlreadyUnliked(commentsIdsUnlikedByUser, comment.id)
              }
              removeThumbDown={() =>
                removeThumbDown(comment.id, userEmail, refresh)
              }
            />
          ))}
          {windowSize < 960 && (
            <RightPanel
              questionsList={false}
              openQuestion={true}
              avatarUrl={authorAvatar}
              author={authorName}
              posts={userPostsQuantity}
            />
          )}
        </div>
        {windowSize >= 960 && (
          <RightPanel
            questionsList={false}
            openQuestion={true}
            avatarUrl={authorAvatar}
            author={authorName}
            posts={userPostsQuantity}
          />
        )}
      </div>
    </>
  );
};

export default OpenQuestionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params.postId;
  const posts = await jsonFetch(postsApi);
  const users = await jsonFetch(usersApi);

  //identifying currently logged user who wants to add comment
  const session = await getSession(context);
  const commentsAuthor = session?.user.name;
  const commentsAuthorAvatar = session?.user.image;

  //searching for the post's author
  const post = getSinglePost(posts, postId);
  const upvotes = post.upvotes;
  const authorName = getAuthorName(post.id, users);
  const authorAvatar = getAuthorAvatar(post.id, users);
  const userPostsQuantity = getUserPostsQuantity(users, authorName);

  const userEmail = session?.user.email;
  const comments = post.comments;

  const commentsIdsLikedByUser = getCommentsIdsLikedByUser(comments, userEmail);
  const commentsIdsUnlikedByUser = getCommentsIdsUnlikedByUser(
    comments,
    userEmail
  );

  //if there is no session (user not logged in), redirect to the main page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
      authorName,
      comments,
      authorAvatar,
      commentsAuthor,
      commentsAuthorAvatar,
      upvotes,
      userPostsQuantity,
      commentsIdsLikedByUser,
      commentsIdsUnlikedByUser,
    },
  };
};
