-- DropForeignKey
ALTER TABLE "Thumbdown" DROP CONSTRAINT "Thumbdown_commentId_fkey";

-- AlterTable
ALTER TABLE "Thumbdown" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Thumbdown" ADD CONSTRAINT "Thumbdown_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
