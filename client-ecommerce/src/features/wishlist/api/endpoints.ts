export const endpoints = {
    wishlist: {
        add: '/wishlist/wish/add',
        delete: (id: string) => `/wishlist/wish/delete/${id}`,
        get: '/wishlist/wish/get',
        wishCount: (userId: string) => `/wishlist/wish/count/${userId}`
    }
}