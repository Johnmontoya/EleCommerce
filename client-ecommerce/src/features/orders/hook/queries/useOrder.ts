import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { orderService } from "../../services/orderService"
import type { OrderFilters } from "../../types/order.types"

export const useOrderAll = (filter?: OrderFilters) => {
    return useQuery({
        queryKey: queryKeys.orders.getAll(filter),
        queryFn: () => orderService.getOrderAll(filter),
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

export const useOrderTrackingNumber = (trackingNumber: string) => {
    return useQuery({
        queryKey: queryKeys.orders.getTrackingNumber(trackingNumber),
        queryFn: () => orderService.getTrackingNumber(trackingNumber),
        select: (response) => response,
        staleTime: 2 * 60 * 1000
    })
}
