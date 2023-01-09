import QuestionListItem from "../../components/QuestionListItem";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import styles from "../../components/modules/QuestionsTeasersPage.module.scss";
import {
  getAuthorName,
  getAuthorAvatar,
  getTeaserText,
  getTags,
  jsonFetch,
  handleIncreaseViews,
} from "../../helperFunctions";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import RightPanel from "../../components/RightPanel";
import useWindowSize from "../../useWindowSize";
import { postsApi, usersApi } from "../../env_variables";
import { Post, User } from "../../interfaces";
import { NextPage } from "next";
import { GetServerSideProps } from "next";

interface QuestionsProps {
  posts: Post[];
  users: User[];
}

const Questions: NextPage<QuestionsProps> = ({ posts, users }) => {
  const { status } = useSession();
  const [searchedWord, setSearchedWord] = useState("");
  const [route, setRoute] = useState("");
  const windowSize = useWindowSize();

  return (
    <>
      <Navbar
        userLoggedIn={status === "authenticated"}
        onClick={() => signOut()}
      />
      <div className={styles.sidebarAndMainLayoutContainer}>
        <Sidebar
          itemSelected={"questions"}
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          action={`/questions/search/${route}`}
          onSubmit={() => setRoute(searchedWord.toLowerCase().trim())}
        />
        <div className={styles.questionsContainer}>
          {posts.map((post) => (
            <QuestionListItem
              key={post.id}
              nickname={getAuthorName(post.id, users)}
              date={post.createdAt}
              title={post.title}
              text={post.content}
              imageUrl={getAuthorAvatar(post.id, users)}
              tags={getTags(post.tags)}
              viewsAmount={post.viewCount}
              commentsAmount={post.commentsCount}
              upvotesAmount={post.upvotesCount}
              postId={post.id}
              handleIncreaseViews={() => handleIncreaseViews(post.id)}
              userLoggedIn={status === "authenticated"}
            />
          ))}
          {windowSize < 960 && (
            <RightPanel questionsList={true} openQuestion={false} />
          )}
        </div>
        {windowSize >= 960 && (
          <RightPanel questionsList={true} openQuestion={false} />
        )}
      </div>
    </>
  );
};

export default Questions;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await jsonFetch(`${postsApi}`);

  const users = await jsonFetch(`${usersApi}`);

  return {
    props: { posts, users },
  };
};
