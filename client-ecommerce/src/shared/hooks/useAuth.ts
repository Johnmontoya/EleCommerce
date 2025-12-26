import { useAuthStore } from "../../features/auth/store/useAuthStore";

export const useAuth = () => {
    const {
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        logoutAllDevices,
        refreshAccessToken,
        getCurrentUser,
        setUser,
        clearError,
    } = useAuthStore();

    return {
        // Estado
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        error,

        // Acciones
        login,
        logout,
        logoutAllDevices,
        refreshAccessToken,
        getCurrentUser,
        setUser,
        clearError,

        // Utilidades
        isAdmin: user?.role === 'ADMIN',
        isUser: user?.role === 'USER',
        userId: user?.id,
        userEmail: user?.email,
    };
};