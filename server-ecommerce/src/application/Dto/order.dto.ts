import type { CreateOrderSchema, OrderItemSchema } from "../../infrastructure/validation/Order.schema";
import type { CreateUserData } from "./auth.dto";
import type { z } from "zod";

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type CreateOrderItem = z.infer<typeof OrderItemSchema>;

export interface Order {
    id: string;
    userId: string;
    user: CreateUserData;
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    addressId: string;
    trackingNumber: string;
    notes: string;
}