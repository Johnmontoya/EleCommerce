import type { CreateOrderInput, CreateOrderItem } from "../../application/Dto/order.dto.js";
import type { OrderEntity } from "../entities/Orders.js";

export interface IOrderRepository {
    createOrder(order: CreateOrderInput, items: CreateOrderItem[]): Promise<boolean>;
    getAllOrders(filters?: OrderFilters): Promise<OrderEntity[]>;
    cancelOrder(orderId: string): Promise<boolean>;
    getAllOrdersByUser(userId: string, filters?: OrderFilters): Promise<OrderEntity[]>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>;
    getTrackingNumber(trackingNumber: string): Promise<OrderEntity[]>;
}

export interface OrderFilters {
    search?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    status?: OrderStatus | undefined;
}

export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
}
