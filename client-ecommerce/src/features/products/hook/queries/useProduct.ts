import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { ProductFilters } from "../../types/product.types";
import { productService } from "../../services/productService";
import { queryKeys } from "../../../../shared/lib/queryClient";

export const useProducts = (filters?: ProductFilters) => {
    return useQuery({
        queryKey: queryKeys.products.list(filters),
        queryFn: () => productService.getAll(filters),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: queryKeys.products.detail(id),
        queryFn: () => productService.getById(id),
        select: (response) => response.data,
        enabled: !!id,
    })
}

export const useProductByBrand = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            const response = await productService.getAll()
            const brands = [...new Set(response.data.map((product) => product.brand))];
            return brands.sort();
        },
        staleTime: 10 * 60 * 1000,
    })
}

export const useProductBySlug = (slug: string) => {
    return useQuery({
        queryKey: queryKeys.products.bySlug(slug),
        queryFn: () => productService.getBySlug(slug),
        select: (response) => response.data,
        enabled: !!slug,
    })
}

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await productService.getAll();
            const categories = [...new Set(response.data.map(p => p.category))];
            return categories.sort();
        },
        staleTime: 10 * 60 * 1000,
    });
};

export const useProductsInfiniteQuery = (filters?: any) => {
    return useInfiniteQuery({
        queryKey: queryKeys.products.list(filters),
        queryFn: ({ pageParam = 0 }) => productService.getAll({ ...filters, limit: 10, offset: pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data && lastPage.data.length === 10) {
                return allPages.length * 10;
            }
            return undefined;
        },
        initialPageParam: 0,
    })
}

