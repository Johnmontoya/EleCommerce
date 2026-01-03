import type { CreateOrderInput, CreateOrderItem } from "../../application/Dto/order.dto";
import type { OrderEntity } from "../entities/Orders";

export interface IOrderRepository {
    createOrder(order: CreateOrderInput, items: CreateOrderItem[]): Promise<boolean>;
    getAllOrders(filters?: OrderFilters): Promise<OrderEntity[]>;
    cancelOrder(orderId: string): Promise<boolean>;
    getAllOrdersByUser(userId: string, filters?: OrderFilters): Promise<OrderEntity[]>;
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
