/*
  Warnings:

  - Added the required column `status` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "movieStatus" AS ENUM ('NOT_WATCHED', 'WATCHED');

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "status" "movieStatus" NOT NULL;
