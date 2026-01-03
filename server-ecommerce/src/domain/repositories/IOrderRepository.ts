import type { CreateOrderInput, CreateOrderItem } from "../../application/Dto/order.dto";
import type { OrderEntity } from "../entities/Orders";

export interface IOrderRepository {
    createOrder(order: CreateOrderInput, items: CreateOrderItem[]): Promise<boolean>;
    getAllOrders(): Promise<OrderEntity[]>;
    cancelOrder(orderId: string): Promise<boolean>;
    getAllOrdersByUser(userId: string): Promise<OrderEntity[]>;
}