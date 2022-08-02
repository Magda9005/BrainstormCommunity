import Sidebar from "../../components/Sidebar";
import { tags } from "../../helperFunctions";
import {useSession,signOut} from 'next-auth/react';
import Navbar from "../../components/Navbar";
import styles from '../../components/modules/TagsPage.module.scss';
import Link from "next/link";
import type { NextPage } from 'next'
import {useState} from 'react';

const TagsPage:NextPage=()=>{
    const { status }=useSession();
    const [route,setRoute]=useState('')
    const [searchedWord,setSearchedWord]=useState('')
    return (
        <>
        <Navbar userLoggedIn={status==='authenticated'} onClick={()=>signOut()}/>
        <div className={styles['sidebar-and-main-layout-container']}>
        <Sidebar itemSelected={"tags"}
        value={searchedWord} onChange={(e)=>setSearchedWord((e.target as HTMLInputElement).value)}
        action={`/questions/search/${route}`}
  onSubmit={()=>setRoute(searchedWord.toLowerCase().trim())}/>
    <div className={styles["container"]}>
    <div className={styles['tags-container']}>
        {tags.map(tag=>
           <Link href={`/tags/${tag}`}>
         <div key={tag} className={styles.tag}> <span className={styles['tag-name']}> {tag} </span> </div>
                </Link>
                )}
    </div>
     </div>
     
     </div>
     </>
    )
}

export default TagsPage;