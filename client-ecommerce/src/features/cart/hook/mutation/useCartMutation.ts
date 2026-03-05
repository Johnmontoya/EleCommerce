import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService } from "../../services/cartService";
import { toast } from "sonner";
import type { CreateCartInput, UpdateCartInput } from "../../types/cart.types";
import { AxiosError } from "axios";

export const useCartAddMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cart: CreateCartInput) => cartService.createCart(cart),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success("Producto agregado al carrito");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al agregar el producto al carrito");
        }
    })
}

export const useCartDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => cartService.deleteCart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success("Producto eliminado del carrito");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar el producto del carrito");
        }
    })
}

export const useCartCreateOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (order: CreateCartInput) => cartService.createOrder(order),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });

            toast.success("Pedido creado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al crear el pedido");
        }
    })
}

export const useCartUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cart: UpdateCartInput) => cartService.updateCart(cart.id, cart.quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });

            toast.success("Producto actualizado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al actualizar el producto");
        }
    })
}


