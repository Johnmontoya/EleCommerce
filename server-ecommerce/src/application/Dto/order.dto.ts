import type { CreateUserData } from "./auth.dto";

export interface Order {
    id: string;
    userId: string;
    user: CreateUserData;
    //items: OrderItem[];
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    shippingAddress: string;
    billingAddress: string;
    trackingNumber: string;
    notes: string;
}