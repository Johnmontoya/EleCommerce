import { useQuery } from "@tanstack/react-query"
import { authService } from "../../services/authService"
import { queryKeys } from "../../../../shared/lib/queryClient"
import type { UsersFilters } from "../../types/auth.types"

export const useUsers = (filters?: UsersFilters) => {
    return useQuery({
        queryKey: queryKeys.user.list(filters),
        queryFn: () => authService.getAllUsers(filters),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}

export const useUser = (id: string) => {
    return useQuery({
        queryKey: queryKeys.user.detail(id),
        queryFn: () => authService.getUser(id),
        select: (response) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}

export const useCartCount = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: () => authService.getCartUser(),
        select: (response) => response,
        staleTime: 2 * 60 * 1000,
    })
}
