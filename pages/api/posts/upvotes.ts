import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {Upvote} from '../../../interfaces';
const prisma = new PrismaClient();

type Data=Upvote[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
const {id,user}=req.body

    const upvotesCountUpdate = await prisma.post.update({
     where: {
       id:Number(id)
     },
     data:{
       upvotesCount:{
         increment:1,
       }
     }
    }
    );
  await prisma.upvote.create({
      data:{
        postId:id,
        votedBy:user
      }
          }
          )
  
return   res.json(upvotesCountUpdate)  

  }

  if (req.method === "GET") {
   
    const upvotes=await prisma.upvote.findMany();

    return res.json(upvotes)

  }
}


