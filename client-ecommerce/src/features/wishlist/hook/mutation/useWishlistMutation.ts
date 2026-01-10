import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateWishlistDTO } from "../../types/wish.types";
import { wishService } from "../../services/wishServices";
import { toast } from "sonner";

export const useWishlistAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (wishlist: CreateWishlistDTO) => wishService.addToWishlist(wishlist),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });

            toast.success("Producto agregado a la lista de deseos");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al agregar el producto a la lista de deseos");
        }
    })
}

export const useWishlistDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => wishService.removeFromWishlist(id),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });

            toast.success(response.message || "Producto eliminado de la lista de deseos");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el producto de la lista de deseos");
        }
    })
}
