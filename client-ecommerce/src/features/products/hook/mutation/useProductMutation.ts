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
            queryClient.invalidateQueries({ queryKey: ['products'] });

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
            queryClient.invalidateQueries({ queryKey: ['products'] });

            //Invalidar el detalle del producto
            queryClient.invalidateQueries({
                queryKey: ['products', variables.id]
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
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });

            toast.success(response.message || "Producto eliminado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el producto");
        }
    })
}

export const useDeleteManyProductsMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => productService.deleteMany(ids),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });

            toast.success(response.message || "Productos eliminados exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar los productos");
        }
    })
}
