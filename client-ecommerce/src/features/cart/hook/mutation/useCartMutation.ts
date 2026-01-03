import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../../services/cartService";
import { toast } from "sonner";
import type { CreateCartInput, UpdateCartInput } from "../../types/cart.types";

export const useCartAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cart: CreateCartInput) => cartService.createCart(cart),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success(response.message || "Producto agregado al carrito");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al agregar el producto al carrito");
        }
    })
}

export const useCartDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => cartService.deleteCart(id),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success(response.message || "Producto eliminado del carrito");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el producto del carrito");
        }
    })
}

export const useCartCreateOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (order: CreateCartInput) => cartService.createOrder(order),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });

            toast.success(response.message || "Pedido creado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al crear el pedido");
        }
    })
}

export const useCartUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cart: UpdateCartInput) => cartService.updateCart(cart.id, cart.quantity),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success(response.message || "Producto actualizado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar el producto");
        }
    })
}


