import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;
    const viewsUpdate = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
    return res.json(viewsUpdate);
  }

  if (req.method === "GET") {
    const allPosts = await prisma.post.findMany();

    return res.json(allPosts);
  }
}
