import type { CreateOrderInput, CreateOrderItem } from "../../application/Dto/order.dto.js";
import { prisma } from "../../config/prisma.js";
import type { OrderEntity } from "../../domain/entities/Orders.js";
import type { IOrderRepository, OrderFilters, OrderStatus } from "../../domain/repositories/IOrderRepository.js";
import type { Prisma } from "@prisma/client";
import { ProductModel } from "../models/product.model.js";

export class PrismaOrderRepository implements IOrderRepository {
    async getAllOrdersByUser(userId: string, filters?: OrderFilters): Promise<OrderEntity[]> {
        const where: Prisma.OrderWhereInput = {
            userId: userId
        };

        if (filters) {
            if (filters.status) {
                where.status = filters.status;
            }

            if (filters.startDate || filters.endDate) {
                const createdAt: Prisma.DateTimeFilter = {};
                if (filters.startDate) createdAt.gte = new Date(filters.startDate);
                if (filters.endDate) createdAt.lte = new Date(`${filters.endDate}T23:59:59.999Z`);
                where.createdAt = createdAt;
            }
        }

        return await prisma.order.findMany({
            where,
            include: {
                items: true,
                address: true,
            }
        })
    }
    async createOrder(
        order: CreateOrderInput,
        items: CreateOrderItem[]
    ): Promise<OrderEntity | null> {

        if (items.length === 0) {
            console.error("No se pueden crear pedidos sin ítems");
            return null;
        }

        try {
            let createdOrderResult: OrderEntity | null = null;

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
                        trackingNumber: order.trackingNumber || null,
                        notes: order.notes || null,
                        status: "PENDING",
                    },
                });

                if (!createdOrder) {
                    throw new Error("Error al crear la orden principal");
                }

                createdOrderResult = createdOrder as unknown as OrderEntity;

                // 2. Crear TODOS los ítems del pedido de una vez
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
                            stock: { $gte: item.quantity }
                        },
                        {
                            $inc: { stock: -item.quantity }
                        },
                        {
                            new: true
                        }
                    );

                    if (!updatedProduct) {
                        throw new Error(`Stock insuficiente para el producto ${item.productId}`);
                    }
                }

                await tx.cart.delete({ where: { id: items[0]!.cartId } });
            });

            return createdOrderResult;
        } catch (error) {
            console.error("Error creando el pedido:", error);
            return null;
        }
    }
    async getAllOrders(filters?: OrderFilters): Promise<OrderEntity[]> {
        const where: Prisma.OrderWhereInput = {};

        if (filters) {
            if (filters?.search) {
                where.OR = [
                    { trackingNumber: { contains: filters.search } },
                ];
            }

            if (filters?.status !== undefined) {
                where.status = filters.status;
            }

            if (filters.startDate || filters.endDate) {
                const createdAt: Prisma.DateTimeFilter = {};
                if (filters.startDate) createdAt.gte = new Date(filters.startDate);
                if (filters.endDate) createdAt.lte = new Date(`${filters.endDate}T23:59:59.999Z`);
                where.createdAt = createdAt;
            }
        }

        const queryBuilder = prisma.order.findMany({
            where,
            include: {
                items: true,
                address: true,
            }
        })

        return queryBuilder;
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

    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean> {
        try {
            await prisma.order.update({
                where: { id: orderId },
                data: { status }
            });
            return true;
        } catch (error) {
            console.error('Error updating order status:', error);
            return false;
        }
    }

    getTrackingNumber(trackingNumber: string): Promise<OrderEntity[]> {
        return prisma.order.findMany({
            where: {
                id: trackingNumber
            },
            include: {
                items: true,
                address: true,
            }
        })
    }
}