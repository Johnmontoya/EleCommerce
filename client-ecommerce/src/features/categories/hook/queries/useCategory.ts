import { useQuery } from "@tanstack/react-query"
import { categoryService } from "../../services/categoryService"
import { queryKeys } from "../../../../shared/lib/queryClient"
import type { CategoryFilters } from "../../type/category.types"

export const useCategories = (filters?: CategoryFilters) => {
    return useQuery({
        queryKey: queryKeys.categories.list(filters),
        queryFn: () => categoryService.getAll(filters),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}

export const useCategory = (id: string) => {
    return useQuery({
        queryKey: queryKeys.categories.detail(id),
        queryFn: () => categoryService.getById(id),
        select: (response) => response.data,
        enabled: !!id,
    })
}