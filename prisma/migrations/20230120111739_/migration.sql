/*
  Warnings:

  - Added the required column `student_year` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InOrOut` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `className` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAttendance` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repeating` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "userAuthToken" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "student_number" TEXT NOT NULL,
    "student_year" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar", "createdAt", "fname", "id", "passwordHash", "roleId", "student_number", "surname", "updatedAt", "userAuthToken", "username") SELECT "avatar", "createdAt", "fname", "id", "passwordHash", "roleId", "student_number", "surname", "updatedAt", "userAuthToken", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_userAuthToken_key" ON "User"("userAuthToken");
CREATE UNIQUE INDEX "User_student_number_key" ON "User"("student_number");
CREATE TABLE "new_Attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_number" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "InOrOut" TEXT NOT NULL,
    "timeAttendance" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Attendance" ("createdAt", "id", "student_number") SELECT "createdAt", "id", "student_number" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
CREATE TABLE "new_Classes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "repeating" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Classes" ("createdAt", "description", "id", "status") SELECT "createdAt", "description", "id", "status" FROM "Classes";
DROP TABLE "Classes";
ALTER TABLE "new_Classes" RENAME TO "Classes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
