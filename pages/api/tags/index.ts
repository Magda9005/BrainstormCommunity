import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  name: string;
  posts: {
    id: number;
  }[];
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allTags = await prisma.tag.findMany({
    include: {
      posts: {
        select: {
          id: true,
        },
      },
    },
  });

  return res.json(allTags);
}
