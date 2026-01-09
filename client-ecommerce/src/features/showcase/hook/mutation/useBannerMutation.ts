import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showcaseService } from "../../services/showcaseService";
import { toast } from "sonner";
import type { Banner } from "../../types/banner.types";

export const useAddBannerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, banner }: { id: string, banner: Banner }) => showcaseService.updateBanner(id, banner),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
            queryClient.invalidateQueries({ queryKey: ['showcase'] });

            toast.success(response.message || "Banner agregado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al agregar el banner");
        }
    })
}

export const useDeleteBannerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => showcaseService.deleteBanner(id),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
            queryClient.invalidateQueries({ queryKey: ['showcase'] });

            toast.success(response.message || "Banner eliminado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al eliminar el banner");
        }
    })
}
