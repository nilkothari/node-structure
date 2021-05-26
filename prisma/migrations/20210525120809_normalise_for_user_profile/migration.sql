/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropIndex
DROP INDEX "User_roleId_unique";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId",
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_profileId_unique" ON "User"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_roleId_unique" ON "Profile"("roleId");

-- AddForeignKey
ALTER TABLE "Profile" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
