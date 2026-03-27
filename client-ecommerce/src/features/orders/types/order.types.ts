import type { Address } from "../../profile/types/profile.types"

export interface OrderResponse {
    id: string,
    userId: string,
    subtotal: number,
    tax: number,
    shippingCost: number,
    discount: number,
    total: number,
    status: string,
    paymentStatus: string,
    paymentMethod: string,
    addressId: string,
    trackingNumber: string,
    items: OrderItem[],
    address: Address,
    notes: string | null,
    createdAt: string,
    updatedAt: string
}

export interface OrderItem {
    id: string,
    orderId: string,
    productId: string,
    productName: string,
    productImage: string,
    price: number,
    quantity: number,
    total: number,
    createdAt: string,
    updatedAt: string
}

export interface OrderFilters {
    [key: string]: unknown;
    search?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export interface OrderExport {
    orderId: string;
    customer: string;
    total: number;
    date: string;
    products: OrderItem[];
}
