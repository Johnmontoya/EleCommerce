import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "../../services/paymentService";
import type { PaymentInput, UpdatePaymentInput } from "../../types/payment.types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const usePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payment: PaymentInput) => paymentService.createPayment(payment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success("Tarjeta verificada exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al verificar la tarjeta");
        }
    })
}

export const useUpdatePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payment }: UpdatePaymentInput) => paymentService.updatePayment({ id, payment }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success("Tarjeta actualizada exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al actualizar la tarjeta");
        }
    })
}

export const useDeletePaymentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => paymentService.deletePayment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payment'] });
            toast.success("Tarjeta eliminada exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar la tarjeta");
        }
    })
}