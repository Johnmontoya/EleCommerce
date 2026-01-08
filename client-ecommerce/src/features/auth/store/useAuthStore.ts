import { toast } from "sonner";
import { authService } from "../services/authService";
import type { AuthResponse, LoginRequest, User } from "../types/auth.types";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    logoutAllDevices: () => Promise<void>;
    refreshAccessToken: () => Promise<void>;
    getCurrentUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            cart: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            //Login
            login: async (credentials: LoginRequest) => {
                set({ isLoading: true, error: null });
                try {
                    const { data }: AuthResponse = await authService.login(credentials);
                    set({
                        user: data.user,
                        accessToken: data.tokens.accessToken,
                        refreshToken: data.tokens.refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })

                    toast.success('Inicio de sesión exitoso');
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
                    set({ isLoading: false, error: errorMessage, isAuthenticated: false });
                    toast.error(errorMessage);
                    throw error;
                }
            },

            //Logout
            logout: async () => {
                set({ isLoading: true });
                try {
                    const { refreshToken } = get();
                    if (refreshToken) {
                        await authService.logout(refreshToken)
                    }
                    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false, isLoading: false, error: null });
                    toast.success('Cierre de sesión exitoso');
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Error al cerrar sesión';
                    set({ isLoading: false });
                    toast.error(errorMessage);
                }
            },

            // Logout de todos los dispositivos
            logoutAllDevices: async () => {
                set({ isLoading: true });
                try {
                    await authService.logoutAllDevices();

                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });

                    toast.success('Sesión cerrada en todos los dispositivos');
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Error al cerrar sesiones';
                    set({ isLoading: false });
                    toast.error(errorMessage);
                }
            },

            // Refrescar token
            refreshAccessToken: async () => {
                try {
                    const { refreshToken } = get();
                    if (!refreshToken) {
                        throw new Error('No refresh token available');
                    }

                    const response = await authService.refreshToken(refreshToken);

                    set({
                        accessToken: response.tokens.accessToken,
                        refreshToken: response.tokens.refreshToken,
                    });
                } catch (error) {
                    // Si falla el refresh, cerrar sesión
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                    });
                    throw error;
                }
            },

            // Obtener usuario actual
            getCurrentUser: async () => {
                set({ isLoading: true });
                try {
                    const response = await authService.getCurrentUser();
                    set({
                        user: response.data,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || 'Error al obtener usuario',
                        isLoading: false,
                    });
                }
            },

            // Setear usuario manualmente
            setUser: (user: User | null) => {
                set({ user });
            },

            // Limpiar error
            clearError: () => {
                set({ error: null });
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
)