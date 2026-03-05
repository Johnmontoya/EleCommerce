import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../shared/lib/queryClient";
import { toast } from "sonner";
import type { Category } from "../../type/category.types";
import { categoryService } from "../../services/categoryService";
import { AxiosError } from "axios";

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: Category) => categoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success("Categoria creada exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al crear la categoria");
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

            toast.success("Producto actualizado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al actualizar el producto");
        }
    });
};

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => categoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success("Producto eliminado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar el producto");
        }
    })
}

export const useDeleteManyCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => categoryService.deleteMany(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success("Productos eliminados exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar los productos");
        }
    })
}
