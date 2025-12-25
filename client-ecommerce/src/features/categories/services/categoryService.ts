import { apiClient } from "../../../shared/api/client";
import type { ApiResponse, ProductFilters } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";
import type { Category } from "../type/category.types";

export const categoryService = {
    create: async (category: Partial<Category>): Promise<ApiResponse<Category>> => {
        const { data } = await apiClient.post(endpoints.categories.create, category);
        return data;
    },
    update: async (id: string, category: Partial<Category>): Promise<ApiResponse<Category>> => {
        const { data } = await apiClient.put(endpoints.categories.update(id), category);
        return data;
    },
    delete: async (id: string): Promise<ApiResponse<void>> => {
        const { data } = await apiClient.delete(endpoints.categories.delete(id));
        return data;
    },
    getAll: async (filters?: ProductFilters): Promise<ApiResponse<Category[]>> => {
        const { data } = await apiClient.get(endpoints.categories.list);
        if (filters) {
            return data;
        }
        return data;
    },
    getById: async (id: string): Promise<ApiResponse<Category>> => {
        const { data } = await apiClient.get(endpoints.categories.detail(id));
        return data;
    },
    getBySlug: async (slug: string): Promise<ApiResponse<Category>> => {
        const { data } = await apiClient.get(endpoints.categories.bySlug(slug));
        return data;
    }
}