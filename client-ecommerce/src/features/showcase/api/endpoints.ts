export const endpoints = {
    banner: {
        getAll: '/products/banners',
        update: (id: string) => `/products/banners/${id}`,
        delete: (id: string) => `/showcase/showcase/delete/${id}`,
    }
}