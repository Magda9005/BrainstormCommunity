-- CreateTable
CREATE TABLE "Thumbup" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "votedBy" TEXT NOT NULL,

    CONSTRAINT "Thumbup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thumbdown" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "votedBy" TEXT NOT NULL,

    CONSTRAINT "Thumbdown_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thumbup" ADD CONSTRAINT "Thumbup_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbdown" ADD CONSTRAINT "Thumbdown_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
