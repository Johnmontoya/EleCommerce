export const endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        logoutAllDevices: '/auth/logout-all-devices',
        me: '/auth/me',
        refreshToken: '/auth/refresh-token',
        forgotPassword: '/auth/forgot-password',
        resetPassword: '/auth/reset-password',
        verifyEmail: '/auth/verify-email',
        changePassword: '/auth/change-password',
    },
    user: {
        list: '/auth/all',
        detail: (id: string) => `/auth/${id}`,
        create: '/auth',
        update: (id: string) => `/auth/${id}`,
        delete: (id: string) => `/auth/${id}`,
    },
    role: {
        list: '/roles',
        detail: (id: string) => `/roles/${id}`,
        create: '/roles',
        update: (id: string) => `/roles/${id}`,
        delete: (id: string) => `/roles/${id}`,
    },
    permission: {
        list: '/permissions',
        detail: (id: string) => `/permissions/${id}`,
        create: '/permissions',
        update: (id: string) => `/permissions/${id}`,
        delete: (id: string) => `/permissions/${id}`,
    }
}