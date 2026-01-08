import { apiClient } from "../../../shared/api/client";
import type { ApiResponse, Product } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";

export const homeService = {
    getBanner: async (limit?: number): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.showcase.banner, {
            params: { limit }
        });
        return data;
    },

    getPromotions: async (): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.showcase.promotional);
        return data;
    },

    getTrends: async (): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.showcase.trends);
        return data;
    },

    getShowcase: async (): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.showcase.showcase);
        return data;
    },
}