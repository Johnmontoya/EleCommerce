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
        cartCount: (userId: string) => `/cart/cart/count/${userId}`
    },
    user: {
        list: '/auth/all',
        detail: (id: string) => `/auth/${id}`,
        create: '/auth',
        update: (id: string) => `/auth/update/${id}`,
        delete: (id: string) => `/auth/delete/${id}`,
        deleteUsers: '/auth/delete-users',
        toggleActive: (id: string) => `/auth/toggle-active/${id}`,
        getUserById: (id: string) => `/auth/get-user/${id}`,
    }
}