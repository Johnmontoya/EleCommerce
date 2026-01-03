import { apiClient } from "../../../shared/api/client";
import { endpoints } from "../api/endpoints";
import type { ApiResponse, Product, ProductAutocomplete, ProductFilters } from "../types/product.types";

export const productService = {
    create: async (product: Partial<Product>): Promise<ApiResponse<Product>> => {
        const { data } = await apiClient.post(endpoints.products.create, product);
        return data;
    },

    getAll: async (filters?: ProductFilters): Promise<ApiResponse<Product[]>> => {
        const params = new URLSearchParams();

        if (filters) {
            if (filters.category) params.append('category', filters.category);
            if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
            if (filters.search) params.append('search', filters.search);
            if (filters.limit) params.append('limit', filters.limit.toString());
            if (filters.offset) params.append('offset', filters.offset.toString());
            if (filters.isPublished !== undefined) params.append('isPublished', filters.isPublished.toString());

            // ✨ CRÍTICO: Enviar brands como string separado por comas
            if (filters.brands && filters.brands.length > 0) {
                params.append('brands', filters.brands.join(','));
            }
        }

        const { data } = await apiClient.get(endpoints.products.list + '?' + params.toString());
        return data;
    },

    // GET /products/:id
    getById: async (id: string): Promise<ApiResponse<Product>> => {
        const { data } = await apiClient.get(endpoints.products.detail(id));
        return data;
    },

    getBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
        const { data } = await apiClient.get(endpoints.products.bySlug(slug));
        return data;
    },

    getByCategory: async (category: string): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.products.byCategory(category));
        return data;
    },

    getByBrand: async (brand: string): Promise<ApiResponse<Product[]>> => {
        const { data } = await apiClient.get(endpoints.products.byBrand(brand));
        return data;
    },

    update: async (
        id: string,
        product: Partial<Product>
    ): Promise<ApiResponse<Product>> => {
        console.log(id);
        const { data } = await apiClient.put(endpoints.products.update(id), product);
        return data;
    },

    delete: async (id: string): Promise<ApiResponse<void>> => {
        const { data } = await apiClient.delete(endpoints.products.delete(id));
        return data;
    },

    deleteMany: async (ids: string[]): Promise<ApiResponse<void>> => {
        const { data } = await apiClient.delete(endpoints.products.deleteMany, { data: { ids } });
        return data;
    },

    // GET /products/search?term=X
    search: async (
        term: string,
        limit?: number
    ): Promise<ApiResponse<ProductAutocomplete[]>> => {
        const { data } = await apiClient.get(endpoints.products.search, {
            params: { term, limit },
        });
        return data;
    },
}