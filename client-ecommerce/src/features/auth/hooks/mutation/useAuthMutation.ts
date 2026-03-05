import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteUserProps, RegisterRequest, UpdateUserProps } from "../../types/auth.types";
import { authService } from "../../services/authService";
import { toast } from "sonner";
import type { ChangePasswordInput } from "../../../profile/types/profile.types";
import { AxiosError } from "axios";

export const useAuthRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (auth: RegisterRequest) => authService.register(auth),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success("Usuario creado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al crear el usuario");
        }
    })
}

export const useDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, adminToken }: DeleteUserProps) => authService.deleteUser({ id, adminToken }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success(response.message || "Usuario eliminado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar el usuario");
        }
    })
}

export const useDeleteUsersMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ ids, adminToken }: DeleteUserProps) => authService.deleteUsers({ ids, adminToken }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success(response.message || "Usuarios eliminados exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al eliminar los usuarios");
        }
    })
}

export const useToggleActiveMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, adminToken }: DeleteUserProps) => authService.toggleActiveUser({ id, adminToken }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success(response.message || "Usuario activado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al activar el usuario");
        }
    })
}

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, userData }: UpdateUserProps) => authService.updateUser({ id, userData }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            queryClient.invalidateQueries({
                queryKey: ['profile']
            });
            toast.success(response.message || "Usuario actualizado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al actualizar el usuario");
        }
    })
}

export const useForgotPasswordMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (email: string) => authService.forgotPassword(email),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success(response.message || "Correo enviado exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al enviar el correo");
        }
    })
}

export const useChangePasswordClientMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ email, otp, password }: ChangePasswordInput) => authService.changePasswordClient({ email, otp, password }),
        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            toast.success(response.message || "Contraseña cambiada exitosamente");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Error al cambiar la contraseña");
        }
    })
}
