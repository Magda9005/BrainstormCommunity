import { useState } from "react";
import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import styles from "../../components/modules/AskQuestionPage.module.scss";
import MultipleSelectPlaceholder from "../../components/MuiSelect";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { NextPage } from "next";
import { User } from "../../interfaces";
import { addPostToDb } from "../../helperFunctions";
import { GetServerSideProps } from "next";
 import { useRouter } from 'next/router'


interface AskQuestionProps {
  author: User;
}

const AskQuestion: NextPage<AskQuestionProps> = ({ author }) => {
  const { status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [route, setRoute] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  const [tag, setTag] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const router=useRouter();

  return (
    <>
      <Navbar
        userLoggedIn={status === "authenticated"}
        onClick={status === "authenticated" ? () => signOut() : null}
      />
      <div className={styles.container}>
        <Sidebar
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          action={`/questions/search/${route}`}
          onSubmit={() => setRoute(searchedWord.toLowerCase().trim())}
        />
        <div className={styles.mainLayout}>
          <div className={styles.askQuestionContainer}>
            <MultipleSelectPlaceholder handleChange={handleChange} tag={tag} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
              placeholder="Type catching attention title"
              className={styles.title}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your question"
              className={styles.question}
            />
            <div className={styles.publishButtonContainer}>
                <button
                  className={styles.publishButton}
                  onClick={async () => {
                    await addPostToDb(title, content, author, tag);
                    router.push('/questions')
                  }
                }
                >
                  <div className={styles.sendIconWrapper}>
                    <Image
                      src="/send-icon.svg"
                      alt="BrainstormCommunity-logo"
                      layout="responsive"
                      width="10.83"
                      height="10.83"
                    />
                  </div>
                  <span className={styles.publish}> Publish</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const author = session?.user.email;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { author },
  };
};
