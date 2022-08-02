-- DropForeignKey
ALTER TABLE "Thumbdown" DROP CONSTRAINT "Thumbdown_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Thumbup" DROP CONSTRAINT "Thumbup_commentId_fkey";

-- AddForeignKey
ALTER TABLE "Thumbup" ADD CONSTRAINT "Thumbup_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbdown" ADD CONSTRAINT "Thumbdown_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
