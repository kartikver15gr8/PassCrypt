/*
  Warnings:

  - You are about to drop the column `pasword` on the `Password` table. All the data in the column will be lost.
  - Added the required column `password` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Password_username_key";

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "pasword",
ADD COLUMN     "password" TEXT NOT NULL;
