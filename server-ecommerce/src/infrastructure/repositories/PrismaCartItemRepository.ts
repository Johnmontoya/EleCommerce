import type { CartResponse, CreateCartInput } from "../../application/Dto/cart.dto";
import { prisma } from "../../config/prisma";
import type { CartEntity } from "../../domain/entities/Cart";
import type { CartItemEntity } from "../../domain/entities/CartItem";
import type { ICartItemRepository, ICartRepository } from "../../domain/repositories/ICartRepository";

export class PrismaCartItemRepository implements ICartRepository {
    async createCartAndAddFirstItem(userId: string, cartItemData: CreateCartInput): Promise<boolean> {
        try {
            await prisma.$transaction(async (tx) => {
                // Intentar buscar carrito existente
                let cart = await tx.cart.findUnique({
                    where: { userId },
                });

                // Si no existe, crearlo
                if (!cart) {
                    cart = await tx.cart.create({
                        data: { userId },
                    });
                }

                // Luego agregar el ítem (misma lógica que arriba)
                const existingItem = await tx.cartItem.findFirst({
                    where: {
                        cartId: cart.id,
                        productId: cartItemData.productId,
                    },
                });

                if (existingItem) {
                    await tx.cartItem.update({
                        where: { id: existingItem.id },
                        data: {
                            quantity: existingItem.quantity + cartItemData.quantity,
                            updatedAt: new Date(),
                        },
                    });
                } else {
                    await tx.cartItem.create({
                        data: {
                            cartId: cart.id,
                            name: cartItemData.name,
                            image: cartItemData.image,
                            productId: cartItemData.productId,
                            quantity: cartItemData.quantity,
                            price: cartItemData.price,
                            discount: cartItemData.discount,
                            stock: cartItemData.stock,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    });
                }
            });

            return true;
        } catch (error) {
            console.error('Error creating cart or adding item:', error);
            return false;
        }
    }
    getCart(userId: string): Promise<CartEntity | null> {
        return prisma.cart.findUnique({ where: { userId }, include: { items: true } });
    }
    getAllCarts(): Promise<CartEntity[]> {
        throw new Error("Method not implemented.");
    }
    async deleteCart(id: string): Promise<boolean> {
        try {
            await prisma.cartItem.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error deleting cart:', error);
            return false;
        }
    }
    async updateCart(id: string, quantity: number): Promise<boolean> {
        try {
            await prisma.cartItem.update({ where: { id }, data: { quantity } });
            return true;
        } catch (error) {
            console.error('Error updating cart:', error);
            return false;
        }
    }
}