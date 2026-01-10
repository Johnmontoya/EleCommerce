import type { CreateWishListInput, WishListItemResponse } from "../../application/Dto/wishlist.dto";
import { prisma } from "../../config/prisma";
import type { IWishListRepository } from "../../domain/repositories/IWishListRepository";

export class PrismaWishListRepository implements IWishListRepository {
    async createAndAddItem(userId: string, itemData: CreateWishListInput): Promise<boolean> {
        try {
            await prisma.$transaction(async (tx) => {
                let wish = await tx.wishlist.findUnique({ where: { userId } });

                if (!wish) {
                    wish = await tx.wishlist.create({ data: { userId } });
                }

                await tx.wishlistItem.create({
                    data: {
                        wishlistId: wish.id,
                        productId: itemData.productId,
                        productName: itemData.productName,
                        productImage: itemData.productImage,
                        category: itemData.category,
                        rating: itemData.rating,
                        reviews: itemData.reviews,
                        stock: itemData.stock,
                        price: itemData.price,
                        discount: itemData.discount,
                        total: itemData.price - (itemData.price * itemData.discount / 100),
                        createdAt: new Date()
                    },
                });
            })
            return true;
        } catch (error) {
            console.error('Error creando wish list o agregando item:', error);
            return false;
        }
    }
    async deleteItem(id: string): Promise<boolean> {
        try {
            await prisma.wishlistItem.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error eliminando item de la lista de deseos:', error);
            return false;
        }
    }
    async getWishList(userId: string): Promise<WishListItemResponse[] | null> {
        try {
            const data = await prisma.wishlist.findUnique({ where: { userId }, include: { items: true } });
            return data?.items || null;
        } catch (error) {
            console.error('Error obteniendo lista de deseos:', error);
            return null;
        }
    }

    async getWishCount(userId: string): Promise<number> {
        return await prisma.wishlistItem.count({ where: { wishlist: { userId } } });
    }
}