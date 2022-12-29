import type { NextPage } from "next";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import styles from "../components/modules/HomePage.module.scss";
import Navbar from "../components/Navbar";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>BrainstormCommunity</title>
      </Head>
      <Navbar userLoggedIn={null} />
      <div className={styles.homePageContainer}>
        <div className={styles.loginContainer}>
          <h1 className={styles.header}>Welcome to BrainStormCommunity !</h1>
          <p className={styles.welcomeText}>
            A thousands of questions are waiting for your wise suggestions !
            Join the most helpful community and get all features and priviliges.
          </p>
          {session ? (
            <button className={styles.loginButton} onClick={() => signOut()}>
              Logout
            </button>
          ) : (
            <Link href={"/signin"}>
              <a role="link" className={styles.loginButton}>
                Login
              </a>
            </Link>
          )}
        </div>
        <div className={styles.imageWrapper}></div>
      </div>
    </>
  );
};

export default Home;
