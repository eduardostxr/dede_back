/*
  Warnings:

  - Added the required column `overall` to the `cartas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartas` ADD COLUMN `overall` TINYINT NOT NULL;
