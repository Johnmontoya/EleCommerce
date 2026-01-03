export const endpoints = {
    profile: {
        get: '/auth/me',
        update: '/auth',
        changePassword: '/auth/change-password',
    },
    address: {
        add: '/address/address',
        update: (id: string) => `/address/update/${id}`,
    }
}