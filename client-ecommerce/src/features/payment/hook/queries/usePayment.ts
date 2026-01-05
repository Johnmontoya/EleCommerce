import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { paymentService } from "../../services/paymentService"

export const usePayment = (userId: string) => {
    return useQuery({
        queryKey: queryKeys.payment.get(),
        queryFn: () => paymentService.getPaymentById(userId),
        select: (response: any) => response.data,
        staleTime: 2 * 60 * 1000,
    })
}