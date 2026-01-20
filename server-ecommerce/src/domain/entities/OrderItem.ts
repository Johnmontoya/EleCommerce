import type { Order } from "./Orders.js"

export interface OrderItem {
    id: string;
    orderId: string;
    order: Order;
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
}