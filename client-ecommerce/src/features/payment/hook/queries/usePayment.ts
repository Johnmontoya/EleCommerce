import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../../../../shared/lib/queryClient"
import { paymentService } from "../../services/paymentService"
import type { ApiResponse } from "../../../products/types/product.types"
import type { PaymentInput } from "../../types/payment.types"

export const usePayment = (userId: string) => {
    return useQuery({
        queryKey: queryKeys.payment.get(),
        queryFn: () => paymentService.getPaymentById(userId),
        select: (response: ApiResponse<PaymentInput> | null) => response?.data,
        staleTime: 2 * 60 * 1000,
    })
}