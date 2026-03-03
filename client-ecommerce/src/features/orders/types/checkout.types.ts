// src/features/checkout/types/checkout.types.ts

export interface CartItem {
    id?: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    discount?: number;
}

export interface SavedAddress {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
}

export interface CheckoutPricing {
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
}

export interface CheckoutCustomer {
    email: string;
    name: string;
}

export interface CreateOrderResult {
    orderId: string;
    total: number;
}

export type CheckoutStep = "summary" | "address" | "payment" | "success";