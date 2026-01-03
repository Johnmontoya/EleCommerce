import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";
import type { OrderResponse } from "../types/order.types";

export const orderService = {
    getOrderAll: async (): Promise<OrderResponse[]> => {
        const { data } = await apiClient.get(endpoints.orders);
        return data.data;
    },
    getOrderUser: async (): Promise<OrderResponse[]> => {
        const { data } = await apiClient.get(endpoints.ordersUser);
        return data.data;
    }
}