/*
  Warnings:

  - Added the required column `price` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wishlist_items" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productImage" TEXT NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
