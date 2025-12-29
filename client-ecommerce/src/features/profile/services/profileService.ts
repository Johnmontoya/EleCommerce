import { apiClient } from "../../../shared/api/client";
import type { User } from "../../auth/types/auth.types";
import type { ApiResponse } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";

export const profileService = {
    getProfile: async (): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.get(endpoints.profile.get);
        return data;
    },
    updateProfile: async (user: User): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.put(endpoints.profile.update, user);
        return data;
    },
    changePassword: async (password: string): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.put(endpoints.profile.changePassword, { password });
        return data;
    },
}