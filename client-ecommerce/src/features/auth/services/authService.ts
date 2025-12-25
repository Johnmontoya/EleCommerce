import { apiClient } from "../../../shared/api/client";
import type { ApiResponse } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";
import type { AuthResponse, LoginRequest, LogoutResponse, RefreshResponse, RegisterRequest, User, UsersFilters } from "../types/auth.types";

export const authService = {
    login: async (login: LoginRequest): Promise<AuthResponse> => {
        const { data } = await apiClient.post(endpoints.auth.login, login);
        return data;
    },
    register: async (register: RegisterRequest): Promise<AuthResponse> => {
        const { data } = await apiClient.post(endpoints.auth.register, register);
        return data;
    },
    refreshToken: async (refreshToken: string): Promise<RefreshResponse> => {
        const { data } = await apiClient.post(endpoints.auth.refreshToken, { refreshToken });
        return data;
    },
    logout: async (refreshToken: string): Promise<LogoutResponse> => {
        const { data } = await apiClient.post(endpoints.auth.logout, { refreshToken });
        return data;
    },
    logoutAllDevices: async (): Promise<LogoutResponse> => {
        const { data } = await apiClient.post(endpoints.auth.logoutAllDevices);
        return data;
    },
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.get(endpoints.auth.me);
        return data;
    },
    getAllUsers: async (filters?: UsersFilters): Promise<ApiResponse<User[]>> => {
        const params = new URLSearchParams();

        if (filters) {
            if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
            if (filters.role !== undefined) params.append('role', filters.role);
            if (filters.search !== undefined) params.append('search', filters.search);
            if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
            if (filters.offset !== undefined) params.append('offset', filters.offset.toString());
        }
        const { data } = await apiClient.get(endpoints.user.list + '?' + params.toString());
        return data;
    }
}