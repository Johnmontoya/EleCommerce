import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateWishlistDTO } from "../../types/wish.types";
import { wishService } from "../../services/wishServices";
import { toast } from "sonner";
import { handleApiError } from "../../../../shared/lib/errorHandler";

export const useWishlistAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlist: CreateWishlistDTO) => wishService.addToWishlist(wishlist),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.success("Producto agregado a la lista de deseos");
        },
        onError: (error: unknown) => {
            handleApiError(error, "Error al agregar el producto a la lista de deseos");
        }
    })
}

export const useWishlistDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => wishService.removeFromWishlist(id),
        onSuccess: (response: { message?: string }) => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.success(response.message || "Producto eliminado de la lista de deseos");
        },
        onError: (error: unknown) => {
            handleApiError(error, "Error al eliminar el producto de la lista de deseos");
        }
    })
}
