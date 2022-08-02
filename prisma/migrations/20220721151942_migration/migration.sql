-- DropForeignKey
ALTER TABLE "Thumbup" DROP CONSTRAINT "Thumbup_commentId_fkey";

-- AlterTable
ALTER TABLE "Thumbup" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Thumbup" ADD CONSTRAINT "Thumbup_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
