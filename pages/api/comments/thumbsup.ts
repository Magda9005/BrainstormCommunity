import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Thumbup } from "../../../interfaces";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { commentId, user } = req.body;
    const thumbsupCountUpdate = await prisma.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        upvotesCount: {
          increment: 1,
        },
      },
    });
    await prisma.thumbup.create({
      data: {
        commentId: commentId,
        votedBy: user,
      },
    });

    return res.json(thumbsupCountUpdate);
  }

  if (req.method === "GET") {
    const thumbsUp = await prisma.thumbup.findMany();

    return res.json(thumbsUp);
  }
}
