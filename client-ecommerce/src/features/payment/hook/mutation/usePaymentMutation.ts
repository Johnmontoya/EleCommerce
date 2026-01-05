import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../services/paymentService";
import type { PaymentInput, UpdatePaymentInput } from "../../types/payment.types";
import { toast } from "sonner";

export const usePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payment: PaymentInput) => paymentService.createPayment(payment),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success(response.message || "Tarjeta verificada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al verificar la tarjeta");
        }
    })
}

export const useUpdatePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payment }: UpdatePaymentInput) => paymentService.updatePayment({ id, payment }),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success(response.message || "Tarjeta actualizada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar la tarjeta");
        }
    })
}

export const useDeletePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => paymentService.deletePayment(id),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success(response.message || "Tarjeta eliminada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar la tarjeta");
        }
    })
}