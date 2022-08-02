import Sidebar from "../../components/Sidebar";
import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../components/modules/TagsPage.module.scss";
import QuestionListItem from "../../components/QuestionListItem";
import {
  getAuthorName,
  getTeaserText,
  getAuthorAvatar,
  getTags,
  findPostsByTag,
  jsonFetch,
  handleIncreaseViews,
} from "../../helperFunctions";
import type { NextPage } from "next";
import { Post, User } from "../../interfaces";
import { tagsApi, usersApi, postsApi } from "../../env_variables";
import { useState } from "react";
import useWindowSize from "../../useWindowSize";
import { GetServerSideProps } from "next";

interface PostsSelectedByTagNameProps {
  allPosts: Post[];
  users: User[];
  postsIdsByTag: Post[];
  tagName: string;
}

const PostsSelectedByTagName: NextPage<PostsSelectedByTagNameProps> = ({
  allPosts,
  users,
  postsIdsByTag,
  tagName,
}) => {
  const { status } = useSession();
  const [route, setRoute] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  const windowSize = useWindowSize();

  return (
    <>
      <Navbar
        userLoggedIn={status === "authenticated"}
        onClick={() => signOut()}
      />
      <div className={styles["sidebar-and-main-layout-container"]}>
        <Sidebar
          itemSelected={"tags"}
          value={searchedWord}
          onChange={(e) =>
            setSearchedWord((e.target as HTMLInputElement).value)
          }
          action={`/questions/search/${route}`}
          onSubmit={() => setRoute(searchedWord.toLowerCase().trim())}
        />
        <div className={styles["questions-container"]}>
          <h2 className={styles["tag-name"]}>{tagName}</h2>
          {postsIdsByTag !== null &&
            allPosts.map((post) => {
              for (let postId of postsIdsByTag) {
                if (postId.id == post.id) {
                  return (
                    <QuestionListItem
                      key={post.id}
                      nickname={getAuthorName(post.id, users)}
                      date={post.createdAt}
                      title={post.title}
                      text={getTeaserText(post.content, windowSize)}
                      imageUrl={getAuthorAvatar(post.id, users)}
                      tags={getTags(post.tags)}
                      viewsAmount={post.viewCount}
                      commentsAmount={post.commentsCount}
                      upvotesAmount={post.upvotesCount}
                      postId={post.id}
                      handleIncreaseViews={() => handleIncreaseViews(post.id)}
                      userLoggedIn={status === "authenticated"}
                    />
                  );
                }
              }
            })}
        </div>
      </div>
    </>
  );
};

export default PostsSelectedByTagName;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tagName = context.params.tagName;

  const allPosts = await jsonFetch(postsApi);
  const users = await jsonFetch(usersApi);
  const tags = await jsonFetch(tagsApi);

  const postsIdsByTag = findPostsByTag(tags, tagName);

  return {
    props: { allPosts, users, postsIdsByTag, tagName },
  };
};
