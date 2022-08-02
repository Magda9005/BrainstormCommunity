import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Thumbdown } from "../../../interfaces";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { commentId, user } = req.body;

    const thumbsdownCountUpdate = await prisma.comment.update({
      where: {
        id: Number(commentId),
      },
      data: {
        downvotesCount: {
          increment: 1,
        },
      },
    });
    await prisma.thumbdown.create({
      data: {
        commentId: commentId,
        votedBy: user,
      },
    });
    return res.json(thumbsdownCountUpdate);
  }

  if (req.method === "GET") {
    const thumbsDown = await prisma.thumbdown.findMany();

    return res.json(thumbsDown);
  }
}
