/*
  Warnings:

  - Added the required column `nome` to the `cartas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartas` ADD COLUMN `nome` VARCHAR(60) NOT NULL;
