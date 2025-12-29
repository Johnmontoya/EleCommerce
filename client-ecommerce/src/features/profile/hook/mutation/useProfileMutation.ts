import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../../auth/services/authService";
import { toast } from "sonner";
import type { ChangePasswordInput } from "../../types/profile.types";

export const useChangePasswordMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangePasswordInput) => authService.changePassword(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });

            toast.success(response.message || "Contraseña cambiada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al cambiar la contraseña");
        }
    })
}