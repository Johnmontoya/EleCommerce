import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { cartService } from "../../services/cartService"

export const useCartUser = () => {
    return useQuery({
        queryKey: queryKeys.cart.get(),
        queryFn: () => cartService.getCart(),
        select: (response) => response?.items ?? [],
        staleTime: 2 * 60 * 1000
    })
}

export const useAddressUser = () => {
    return useQuery({
        queryKey: queryKeys.address.get(),
        queryFn: () => cartService.getAddressByUserId(),
        select: (response) => response,
        staleTime: 2 * 60 * 1000
    })
}