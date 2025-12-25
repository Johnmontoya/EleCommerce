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