import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/product.types";
import { productService } from "../../services/productService";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";
import { handleApiError } from "../../../../shared/lib/errorHandler";

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: Partial<Product>) => productService.create(product),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.products.list() });

            toast.success(response.message || "Producto creado exitosamente");
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al crear el producto')
        }
    })
}

export const useUpdateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Product> }) => productService.update(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.products.list() });

            //Invalidar el detalle del producto
            queryClient.invalidateQueries({
                queryKey: queryKeys.products.detail(variables.id)
            })

            queryClient.setQueryData(
                queryKeys.products.detail(variables.id),
                response
            )

            toast.success(response.message || "Producto actualizado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar el producto");
        }
    })
}

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => productService.delete(id),
        onSuccess: (response, deleteId) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.products.list() });

            //Remover el cache de un producto individual
            queryClient.removeQueries({ queryKey: queryKeys.products.detail(deleteId) });

            toast.success(response.message || "Producto eliminado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el producto");
        }
    })
}