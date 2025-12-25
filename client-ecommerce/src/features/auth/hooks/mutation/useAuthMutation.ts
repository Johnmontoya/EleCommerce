import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegisterRequest } from "../../types/auth.types";
import { authService } from "../../services/authService";
import { toast } from "sonner";
import { queryKeys } from "../../../../shared/lib/queryClient";

export const useAuthRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: RegisterRequest) => authService.register(auth),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.user.list()
            });
            toast.success(response.data.message || "Usuario creado exitosamente");
        },
        onError: (error: any) => {
            toast.error(error.response?.data.message || "Error al crear el usuario");
        }
    })
}