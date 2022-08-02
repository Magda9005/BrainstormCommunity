import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { User, Post } from "../../interfaces";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const allData = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        posts: true,
        image: true,
      },
    });
    return res.json(allData);
  }
}
