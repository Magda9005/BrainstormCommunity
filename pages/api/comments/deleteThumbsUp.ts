import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Thumbup } from "../../../interfaces";
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
const {commentId,userEmail}=JSON.parse(req.body)


    const thumbsupCountUpdate =  await prisma.comment.update(
      {
      where: {
        id:6,
      },
      data:{
        upvotesCount:
        {
          decrement:1,
        }
      }
     }
     );
    
    await prisma.thumbup.deleteMany(
      {
        where:{
          commentId:commentId,

          AND:{
            votedBy:userEmail
          }

        }
       
            }
            );
    
  

return   res.json(thumbsupCountUpdate)  
  }

  if (req.method === "GET") {
    const comments=await prisma.comment.findMany({
      include:{
        thumbsUp:true
      }
    });

    return res.json(comments)

  }
}



