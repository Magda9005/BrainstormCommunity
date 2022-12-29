import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import { Thumbdown } from "../../../interfaces";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { commentId, userEmail } = JSON.parse(req.body);

    const thumbsdownCountUpdate = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        downvotesCount: {
          decrement: 1,
        },
      },
    });

    await prisma.thumbdown.deleteMany({
      where: {
        commentId: commentId,

        AND: {
          votedBy: userEmail,
        },
      },
    });

    return res.json(thumbsdownCountUpdate);
  }

  if (req.method === "GET") {
    const comments = await prisma.comment.findMany({
      include: {
        thumbsUp: true,
        thumbsDown: true,
      },
    });

    return res.json(comments);
  }
}
