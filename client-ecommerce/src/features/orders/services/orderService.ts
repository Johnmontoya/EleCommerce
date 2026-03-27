import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";
import type { OrderExport, OrderFilters, OrderResponse } from "../types/order.types";

export interface CreateOrderPayload {
    userId: string;
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    paymentMethod: string;
    addressId: string;
    trackingNumber: string;
    notes: string | null;
    items: {
        cartId: string;
        name: string;
        image: string;
        productId: string;
        quantity: number;
        price: number;
        discount: number;
        total: number;
    }[];
}

export const orderService = {
    createOrder: async (payload: CreateOrderPayload): Promise<{ orderId: string; total: number }> => {
        const { data } = await apiClient.post(endpoints.createOrder, payload);
        return data.data;
    },
    getOrderAll: async (filters?: OrderFilters): Promise<OrderResponse[]> => {
        const { data } = await apiClient.get(endpoints.orders, { params: filters });
        return data.data;
    },
    getOrderUser: async (): Promise<OrderResponse[]> => {
        const { data } = await apiClient.get(endpoints.ordersUser);
        return data.data;
    },
    updateOrderStatus: async (orderId: string, status: string): Promise<OrderResponse> => {
        const { data } = await apiClient.put(endpoints.updateOrderStatus(orderId), { status });
        return data.data;
    },
    deleteOrder: async (orderId: string): Promise<OrderResponse> => {
        const { data } = await apiClient.delete(endpoints.deleteOrder(orderId));
        return data.data;
    },
    getTrackingNumber: async (trackingNumber: string): Promise<OrderResponse> => {
        const { data } = await apiClient.get(endpoints.getTrackingNumber(trackingNumber));
        return data.data[0];
    },
    notifyQueueSystem: async (ordersExport: OrderExport[]): Promise<void> => {
        const jsonString = JSON.stringify(ordersExport, null, 2);
        await apiClient.post(import.meta.env.VITE_QUEUE_SYSTEM_URL, jsonString);
    }
}
