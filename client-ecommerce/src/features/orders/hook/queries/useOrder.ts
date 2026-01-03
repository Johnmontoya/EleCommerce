import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { orderService } from "../../services/orderService"

export const useOrderAll = () => {
    return useQuery({
        queryKey: queryKeys.orders.getAll(),
        queryFn: () => orderService.getOrderAll(),
        select: (response) => response,
        staleTime: 2 * 60 * 1000
    })
}

export const useOrderUser = () => {
    return useQuery({
        queryKey: queryKeys.orders.getUser(),
        queryFn: () => orderService.getOrderUser(),
        select: (response) => response,
        staleTime: 2 * 60 * 1000
    })
}
