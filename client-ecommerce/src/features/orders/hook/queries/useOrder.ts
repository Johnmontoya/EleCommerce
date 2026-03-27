import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { orderService } from "../../services/orderService"
import type { OrderFilters } from "../../types/order.types"

export const useOrderAll = (filter?: OrderFilters) => {
    return useQuery({
        queryKey: queryKeys.orders.getAll(filter),
        queryFn: () => orderService.getOrderAll(filter),
        select: (response) => {
            if (!filter) return response;

            return response.filter((order) => {
                const matchesSearch = !filter.search || 
                    order.trackingNumber.toLowerCase().includes(filter.search.toLowerCase()) ||
                    order.status.toLowerCase().includes(filter.search.toLowerCase());

                const matchesStatus = !filter.status || filter.status === "all" || order.status === filter.status;

                const orderDate = new Date(order.createdAt).getTime();
                const start = filter.startDate ? new Date(filter.startDate).getTime() : -Infinity;
                const end = filter.endDate ? new Date(`${filter.endDate}T23:59:59.999Z`).getTime() : Infinity;
                const matchesDate = orderDate >= start && orderDate <= end;

                return matchesSearch && matchesStatus && matchesDate;
            });
        },
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
