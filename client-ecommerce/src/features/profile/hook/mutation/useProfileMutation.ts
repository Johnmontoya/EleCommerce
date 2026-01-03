import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../../auth/services/authService";
import { toast } from "sonner";
import type { ChangePasswordInput, UpdateAddressInput } from "../../types/profile.types";
import { profileService } from "../../services/profileService";

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

export const useUpdateAddressMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, addressData }: UpdateAddressInput) => profileService.updateAddress({ id, addressData }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['address'] });

            toast.success(response.message || "Direccion actualizada exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al actualizar la direccion");
        }
    })
}

