/*
  Warnings:

  - You are about to drop the column `upvotedPosts` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "upvotedPosts";

-- CreateTable
CREATE TABLE "Upvote" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "votedBy" TEXT NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
