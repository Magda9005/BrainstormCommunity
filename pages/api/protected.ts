// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// //zeby nie zalogowany nie mogl wejsc na tego route'a

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(200).send("unauthorized");
  }

  return res.status(200).json({ name: "John Doe" });
}

// import { authOptions } from '../api/auth/[...nextauth]'
// import { unstable_getServerSession } from "next-auth/next"

// export async function handler(req, res) {
//   const session = await unstable_getServerSession(req, res, authOptions)

//   if (!session) {
//     res.status(401).json({ message: "You must be logged in." });
//     return;
//   }

//   return res.json({
//     message: 'Success',
//   })
// }
