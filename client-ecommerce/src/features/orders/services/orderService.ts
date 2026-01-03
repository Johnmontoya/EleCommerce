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
    }
}