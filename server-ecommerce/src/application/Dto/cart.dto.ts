import type z from "zod";
import type { cartItemSchema } from "../../infrastructure/validation/Cart.schema";

export type CreateCartInput = z.infer<typeof cartItemSchema>;

export interface CartItem {
    id: string;
    cartId: string;
    productId: string; // MongoDB ID
    productName: string;
    productImage: string;
    productSlug: string;
    quantity: number;
    price: number;
    discount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Cart {
    id: string;
    userId?: string;
    sessionId?: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

// Request types
export interface AddToCartRequest {
    productId: string;
    productName: string;
    productImage: string;
    productSlug: string;
    quantity: number;
    price: number;
    discount?: number;
}

export interface UpdateCartItemRequest {
    quantity: number;
}

export interface MergeCartsRequest {
    sessionId: string;
    userId: string;
}

// Response types
export interface CartResponse {
    success: boolean;
    message: string;
}

export interface CartItemResponse {
    data: CartItem;
    message: string;
}

// Summary
export interface CartSummary {
    itemsCount: number;
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
}