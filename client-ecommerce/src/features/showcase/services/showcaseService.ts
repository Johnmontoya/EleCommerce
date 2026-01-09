import { apiClient } from "../../../shared/api/client";
import type { ApiResponse } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";
import type { Banner } from "../types/banner.types";

export const showcaseService = {
    getAllBanners: async (): Promise<ApiResponse<Banner[] | null>> => {
        const { data } = await apiClient.get(endpoints.banner.getAll);
        return data;
    },
    updateBanner: async (id: string, banner: Banner): Promise<ApiResponse<Banner | null>> => {
        const { data } = await apiClient.put(endpoints.banner.update(id), banner);
        return data;
    },
    deleteBanner: async (id: string): Promise<ApiResponse<Banner | null>> => {
        const { data } = await apiClient.delete(endpoints.banner.delete(id));
        return data;
    }
}