-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "bin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "bin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "bin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "favorites" BOOLEAN NOT NULL DEFAULT false;
