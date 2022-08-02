import Sidebar from "../../components/Sidebar";
import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../components/modules/RulesPage.module.scss";
import type { NextPage } from "next";
import { useState } from "react";

const RulesPage: NextPage = () => {
  const { status } = useSession();
  const [route, setRoute] = useState("");
  const [searchedWord, setSearchedWord] = useState("");
  return (
    <>
      <Navbar
        userLoggedIn={status === "authenticated"}
        onClick={() => signOut()}
      />
      <div className={styles["sidebar-and-main-layout-container"]}>
        <Sidebar
          value={searchedWord}
          onChange={(e) =>
            setSearchedWord((e.target as HTMLInputElement).value)
          }
          action={`/questions/search/${route}`}
          onSubmit={() => setRoute(searchedWord.toLowerCase().trim())}
        />
        <div className={styles["text-container"]}>
          <h1 className={styles["rules-header"]}> Rules & tips</h1>
          <p className={styles["rules-text"]}>
            • Before you ask your question, use search bar to verify if the
            similar question hasn't been asked.
          </p>
          <p className={styles["rules-text"]}>
            • Write a concise title that summarizes the specific problem.
          </p>
          <p className={styles["rules-text"]}>
            • Before you post any code, introduce your problem.
          </p>
          <p className={styles["rules-text"]}>
            • Respect other community members, remember-it is forbidden to use
            profanity and offensive language.
          </p>
          <p className={styles["rules-text"]}>
            • Don't hesitate to answer the questions and share your ideas!
          </p>
        </div>
      </div>
    </>
  );
};

export default RulesPage;
