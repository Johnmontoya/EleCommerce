import { apiClient } from "../../../shared/api/client";
import type { ApiResponse, Product } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";

export const homeService = {
    getBanner: async (limit?: number): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.showcase.banner, {
            params: { limit }
        });
        return data;
    }
}