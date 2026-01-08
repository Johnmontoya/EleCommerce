import { apiClient } from "../../../shared/api/client";
import type { ApiResponse } from "../../products/types/product.types";
import type { ChangePasswordInput } from "../../profile/types/profile.types";
import { endpoints } from "../api/endpoints";
import type { AuthResponse, LoginRequest, LogoutResponse, RefreshResponse, RegisterRequest, User, UsersFilters, DeleteUserProps, UpdateUserProps } from "../types/auth.types";

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
    getCartUser: async (userId: string): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.get(endpoints.auth.cartCount(userId));
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
    },
    getUser: async (id: string): Promise<ApiResponse<User>> => {
        const { data } = await apiClient.get(endpoints.user.getUserById(id));
        return data;
    },
    deleteUser: async ({ id, adminToken }: DeleteUserProps): Promise<ApiResponse<null>> => {
        const { data } = await apiClient.delete(endpoints.user.delete(id!), {
            headers: {
                'X-Admin-Token': adminToken
            }
        });
        return data;
    },
    deleteUsers: async ({ ids, adminToken }: DeleteUserProps): Promise<ApiResponse<null>> => {
        const { data } = await apiClient.delete(endpoints.user.deleteUsers, {
            headers: {
                'X-Admin-Token': adminToken
            },
            data: { ids }
        });
        return data;
    },
    toggleActiveUser: async ({ id, adminToken }: DeleteUserProps): Promise<ApiResponse<null>> => {
        const { data } = await apiClient.put(endpoints.user.toggleActive(id!), {
            headers: {
                'X-Admin-Token': adminToken
            }
        });
        return data;
    },
    updateUser: async ({ id, userData }: UpdateUserProps): Promise<ApiResponse<null>> => {
        const { data } = await apiClient.put(endpoints.user.update(id!), userData);
        return data;
    },
    changePassword: async ({ email, otp, password, newPassword }: ChangePasswordInput): Promise<ApiResponse<null>> => {
        const { data } = await apiClient.put(endpoints.auth.changePassword, { email, otp, password, newPassword });
        return data;
    },
}