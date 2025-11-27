/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `promotions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");
