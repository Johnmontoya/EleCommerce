import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showcaseService } from "../../services/showcaseService";
import { toast } from "sonner";
import type { Banner } from "../../types/banner.types";
import type { ApiResponse } from "../../../products/types/product.types";
import { handleApiError } from "../../../../shared/lib/errorHandler";

export const useAddBannerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, banner }: { id: string, banner: Banner }) => showcaseService.updateBanner(id, banner),
        onSuccess: (response: ApiResponse<Banner | null>) => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
            queryClient.invalidateQueries({ queryKey: ['showcase'] });

            toast.success(response.message || "Banner agregado exitosamente");
        },
        onError: (error: unknown) => {
            handleApiError(error, "Error al agregar el banner");
        }
    })
}

export const useDeleteBannerMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => showcaseService.deleteBanner(id),
        onSuccess: (response: ApiResponse<Banner | null>) => {
            queryClient.invalidateQueries({ queryKey: ['banner'] });
            queryClient.invalidateQueries({ queryKey: ['showcase'] });

            toast.success(response.message || "Banner eliminado exitosamente");
        },
        onError: (error: unknown) => {
            handleApiError(error, "Error al eliminar el banner");
        }
    })
}
