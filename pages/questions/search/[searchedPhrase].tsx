import {getAuthorName,getTeaserText,getAuthorAvatar,getTags,jsonFetch,handleIncreaseViews} from '../../../helperFunctions';
import QuestionListItem from '../../../components/QuestionListItem';
import { useSession,signIn,signOut } from 'next-auth/react';
import useWindowSize from '../../../useWindowSize';
import Navbar from '../../../components/Navbar';
import styles from '../../../components/modules/QuestionsTeasersPage.module.scss';
import Sidebar from '../../../components/Sidebar';
import RightPanel from '../../../components/RightPanel';
import { useState } from 'react';
import { PrismaClient } from "@prisma/client";
import {Post,User} from '../../../interfaces';
import { usersApi } from '../../../env_variables';
import { GetServerSideProps } from 'next';


const prisma = new PrismaClient();


interface PostsWithSearchedPhraseProps{
  postsWithSearchedPhrase: Post[];
  users:User[]
}

const PostsWithSearchedPhrase:React.FC<PostsWithSearchedPhraseProps>=({postsWithSearchedPhrase,users,searchedPhrase})=>{
    const { status }=useSession();
    const size=useWindowSize();
    const [route,setRoute]=useState('')
    const [searchedWord,setSearchedWord]=useState('')

   
    return (
        <>
       <Navbar userLoggedIn={status==='authenticated'} onClick={status==='authenticated'?()=>signOut():()=>signIn()}/>
       <div className={styles['sidebar-and-main-layout-container']}>
       <Sidebar itemSelected={"questions"} value={searchedWord} onChange={(e)=>setSearchedWord(e.target.value)} 
    action={`/questions/search/${route}`}
    onSubmit={()=>setRoute(searchedWord.toLowerCase().trim())}
    />
    <div className={styles["questions-container"]}>
{postsWithSearchedPhrase.length>0 && 
       postsWithSearchedPhrase.map(post=>
 <QuestionListItem key={post.id} nickname={getAuthorName(post.id,users)}
date={post.createdAt} title={post.title} text={getTeaserText(post.content)} imageUrl={getAuthorAvatar(post.id,users)} 
tags={getTags(post.tags)} 
viewsAmount={post.viewCount} commentsAmount={post.commentsCount} upvotesAmount={post.upvotesCount} 
postId={post.id} handleIncreaseViews={()=>handleIncreaseViews(post.id)} userLoggedIn={status==='authenticated'}
/>
) 
       }
{postsWithSearchedPhrase.length<1 &&
<div className={styles['question-not-found-container']}>
  <p className={styles['question-not-found-text']}>Sorry, couldn't find question containing<span className={styles['searched-phrase']}>{searchedPhrase} </span>.<br/>
  Please try with different phrase.</p>
   </div>
}


{size < 960 && 
   <RightPanel questionsList={true} openQuestion={false}/>
  }
   </div>
   {size>=960 && 
 <RightPanel questionsList={true} openQuestion={false}/>
}
 </div>
        </>
    )
}


export const getServerSideProps:GetServerSideProps=async(context)=> {
  const searchedPhrase=context.params.searchedPhrase;
const users=await jsonFetch(`${usersApi}`)

const data=await prisma.post.findMany({
  where: {
    content: {
      contains: searchedPhrase,
      mode:'insensitive'
    },
  
},
include:{
  tags:true,
  comments:true,
  upvotes:true,
}})

//I had to make the below function because there was an error 'object ("[object Object]") cannot be serialized as JSON'
const postsWithSearchedPhrase=JSON.parse(JSON.stringify(data))



return {
    props:{postsWithSearchedPhrase,users,searchedPhrase}
}

}


export default PostsWithSearchedPhrase;