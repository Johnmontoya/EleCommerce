import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orderService } from "../../services/orderService";
import { toast } from "sonner";
import { handleApiError } from "../../../../shared/lib/errorHandler";

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, status }: { orderId: string, status: string }) => orderService.updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Estado de la orden actualizado exitosamente');
        },
        onError: (error) => {
            handleApiError(error, 'Error al actualizar el estado de la orden');
        }
    })
}

export const useDeleteOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: string) => orderService.deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Orden eliminada exitosamente');
        },
        onError: (error) => {
            handleApiError(error, 'Error al eliminar la orden');
        }
    })
}