import type { CreateOrderInput, CreateOrderItem } from "../../application/Dto/order.dto";
import { prisma } from "../../config/prisma";
import type { OrderEntity } from "../../domain/entities/Orders";
import type { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { ProductModel } from "../models/product.model";

export class PrismaOrderRepository implements IOrderRepository {
    async getAllOrdersByUser(userId: string): Promise<OrderEntity[]> {
        return await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                items: true,
                address: true,
            }
        })
    }
    async createOrder(
        order: CreateOrderInput,
        items: CreateOrderItem[]
    ): Promise<boolean> {

        if (items.length === 0) {
            console.error("No se pueden crear pedidos sin ítems");
            return false;
        }

        try {
            await prisma.$transaction(async (tx) => {
                // 1. Crear la orden principal
                const createdOrder = await tx.order.create({
                    data: {
                        userId: order.userId,
                        subtotal: order.subtotal,
                        tax: order.tax,
                        shippingCost: order.shippingCost,
                        discount: order.discount,
                        total: order.total,
                        paymentMethod: order.paymentMethod,
                        addressId: order.addressId,
                        trackingNumber: order.trackingNumber || null, // opcional
                        notes: order.notes || null, // opcional
                        status: "PENDING", // recomendado: agregar un status por defecto
                    },
                });

                if (!createdOrder) {
                    throw new Error("Error al crear la orden principal");
                }

                // 2. Crear TODOS los ítems del pedido de una vez (más eficiente y seguro)
                const orderItemsData = items.map((item) => ({
                    orderId: createdOrder.id,
                    productId: item.productId,
                    productName: item.name,
                    productImage: item.image,
                    quantity: item.quantity,
                    price: item.price,
                    discount: item.discount || 0,
                    total: item.price * item.quantity - (item.discount || 0),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }));

                const orderItems = await tx.orderItem.createMany({
                    data: orderItemsData,
                });

                if (!orderItems) {
                    throw new Error("Error al crear los ítems del pedido");
                }

                for (const item of orderItemsData) {
                    const updatedProduct = await ProductModel.findOneAndUpdate(
                        {
                            _id: item.productId,
                            stock: { $gte: item.quantity } // Verifica que haya suficiente stock
                        },
                        {
                            $inc: { stock: -item.quantity } // Resta la cantidad
                        },
                        {
                            new: true      // Importante: dentro de la transacción
                        }
                    );

                    if (!updatedProduct) {
                        throw new Error(`Stock insuficiente para el producto ${item.productId}`);
                    }
                }

                await tx.cart.delete({ where: { id: items[0]!.cartId } });
            });

            return true;
        } catch (error) {
            console.error("Error creando el pedido:", error);
            return false;
        }
    }
    async getAllOrders(): Promise<OrderEntity[]> {
        return await prisma.order.findMany({
            include: {
                items: true,
                address: true,
            }
        })
    }
    async cancelOrder(orderId: string): Promise<boolean> {
        try {
            await prisma.order.delete({ where: { id: orderId } });
            return true;
        } catch (error) {
            console.error('Error deleting order:', error);
            return false;
        }
    }
}