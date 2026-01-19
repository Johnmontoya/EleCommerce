import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";
import type { OrderFilters, OrderResponse } from "../types/order.types";

export const orderService = {
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
    }
}