import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession,signOut} from 'next-auth/react';
import styles from "../components/modules/HomePage.module.scss";
import Navbar from '../components/Navbar';
import Link from 'next/link';

const Home: NextPage= () => {
  const { data: session}=useSession();
  
return(
  <>
   <Head>
        <title>BrainstormCommunity</title>
        </Head>
<Navbar userLoggedIn={null}/>
<div className={styles["home-page-container"]}>
  <div className={styles["login-container"]}>
        <h1 className={styles["header"]}>Welcome to BrainStormCommunity !</h1>
<p className={styles["welcome-text"]}>
A thousands of questions are waiting for your wise suggestions !
Join the most helpful community and get all features and priviliges.
</p>
{session? 
  <button className={styles["login-button"]} onClick={()=>signOut()}> Logout </button>:
  <Link href={'/signin'}>
    <a role="link" className={styles['login-button']}>
   Login
  </a>
  </Link>

}
  </div>
  <div className={styles["image-wrapper"]}>
  </div>
  </div>
</>
)
}

export default Home;

