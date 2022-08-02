import Sidebar from "../../components/Sidebar";
import {useSession,signOut} from 'next-auth/react';
import Navbar from "../../components/Navbar";
import styles from '../../components/modules/VisionPage.module.scss';
import type { NextPage } from 'next'
import {useState} from 'react';


const VisionAndStrategyPage:NextPage=()=>{
    const { status }=useSession();
    const [route,setRoute]=useState('')
    const [searchedWord,setSearchedWord]=useState('')
    return (
        <>
        <Navbar userLoggedIn={status==='authenticated'} onClick={()=>signOut()}/>
        <div className={styles['sidebar-and-main-layout-container']}>
        <Sidebar  value={searchedWord} onChange={(e)=>setSearchedWord((e.target as HTMLInputElement).value)}
        action={`/questions/search/${route}`}
        onSubmit={()=>setRoute(searchedWord.toLowerCase().trim())}/>
    <div className={styles['container']}>
        <div className={styles['text-container']}>
       <h1 className={styles['vision-header']}> Vision & Strategy of BrainstormCommunity </h1>
       <p className={styles['vision-text']}>As the African proverb says: <i>"If you want to go quickly, go alone. If you want to go far, go together."</i></p>
       <p className={styles['vision-text']}> BrainstormCommunity is a free, public platform, the best place for those who want to grow as developers.</p>
       <p className={styles['vision-text']}> The main goal of our community is to provide to developers the possibility to share ideas, interact and support each other.</p>
      <p className={styles['vision-text']}>  It's our mission to help you to upgrade your programming skills. 
        On BrainstormCommunity you will find the tons of questions and answers. </p>
        <p className={styles['vision-text']}>Looking for solution to your tough coding issue? You will certainly find the answer here.</p>
        <p className={styles['vision-text']}> You want to share your knowledge with other and you feel great as a mentor? Don't hesitate to answer the questions and help other
        community members to deal with their programming issues.</p>
        <p className={styles['vision-text']}> Join the BrainstormCommunity and let the adventure to begin! </p>
         </div>
    </div>
     </div>
     </>
    )
}

export default VisionAndStrategyPage;