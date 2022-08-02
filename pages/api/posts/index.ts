import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {Post} from '../../../interfaces';
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
const {title,content,author,tags}=req.body
const maxTagsQuantity=3;

    const newPost = await prisma.post.create({
      data: {
        title: title,
        content: content,
        tags: {
          connectOrCreate:tags.map((tag:string,index:number)=>{
            if(index<maxTagsQuantity){
              return             ({where:{name:tag},create:{name:tag}})

            }
          }
          )
          },
            
        author:{
          connect:{
              email: author,
          }
        }
      },
    });
   
    return res.json(newPost);
  }

 
  if (req.method === "GET") {
    const allPosts= await prisma.post.findMany({
    include:{
          tags:true,
          comments:{
            include:{
              thumbsUp:true,
              thumbsDown:true
            }},
          upvotes:true,
      }
  });

    return res.json(allPosts);

  }
}


    