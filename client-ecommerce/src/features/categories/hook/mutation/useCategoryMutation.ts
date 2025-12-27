import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";
import type { Category } from "../../type/category.types";
import { categoryService } from "../../services/categoryService";

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: Category) => categoryService.create(category),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success(response.message || "Categoria creada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al crear la categoria");
        }
    })
}

export const useUpdateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Category> }) => categoryService.update(id, data),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            //Invalidar el detalle del producto
            queryClient.invalidateQueries({
                queryKey: ['categories', variables.id]
            })

            queryClient.setQueryData(
                queryKeys.categories.detail(variables.id),
                response
            )

            toast.success(response.message || "Producto actualizado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar el producto");
        }
    });
};

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success(response.message || "Producto eliminado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el producto");
        }
    })
}

export const useDeleteManyCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => categoryService.deleteMany(ids),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success(response.message || "Productos eliminados exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar los productos");
        }
    })
}
