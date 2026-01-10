/*
  Warnings:

  - Added the required column `category` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `wishlist_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wishlist_items" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "reviews" INTEGER NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;
