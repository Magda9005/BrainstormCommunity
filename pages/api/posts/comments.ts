import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
const {postId,author,content,avatar}=req.body



    const commentsCountUpdate = await prisma.post.update({
      where: {
        id:Number(postId)
      },
      data:{
        commentsCount:{
          increment:1,
        }
      }
     }
     );

    await prisma.comment.create({
      data: {
        content: content,
        author: author,
        authorImage:avatar,
        post:{
          connect:{
              id: postId,
          }
        }
      },
    });

    

    return res.json(commentsCountUpdate);
  }

  
  if (req.method === "GET") {
   
    const allPosts= await prisma.post.findMany({
      include:{
        comments:true,
      }
    });

    return res.json(allPosts);


  }

}