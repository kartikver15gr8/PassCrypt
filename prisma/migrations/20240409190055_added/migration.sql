/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_title_key" ON "Note"("title");
