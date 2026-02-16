import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../services/productService";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";
import { handleApiError } from "../../../../shared/lib/errorHandler";

export const useCreateProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (product: FormData) => productService.create(product),
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
        mutationFn: ({ id, data }: { id: string, data: FormData }) => productService.update(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });

            queryClient.invalidateQueries({
                queryKey: ['products', variables.id]
            });

            if (queryKeys?.products?.detail) {
                queryClient.setQueryData(
                    queryKeys.products.detail(variables.id),
                    response.data || response
                );
            }

            toast.success(response.message || "Producto actualizado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar el producto");
        }
    })
}

export const useUpdatePublishProductMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, isPublished }: { id: string, isPublished: boolean }) => productService.updatePublish(id, isPublished),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });

            queryClient.invalidateQueries({
                queryKey: ['products', variables.id]
            });

            if (queryKeys?.products?.detail) {
                queryClient.setQueryData(
                    queryKeys.products.detail(variables.id),
                    response.data || response
                );
            }

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

export const useAnalyzeTitleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (title: string) => productService.analyzeTitle(title),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });

            toast.success(response.message || "Título analizado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al analizar el título");
        }
    })
}
