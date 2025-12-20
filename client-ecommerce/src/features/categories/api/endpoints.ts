export const endpoints = {
    categories: {
        list: '/categories/categories',
        detail: (id: string) => `/categories/categories/${id}`,
        create: '/categories/categories',
        update: (id: string) => `/categories/categories/${id}`,
        delete: (id: string) => `/categories/categories/${id}`,
        bySlug: (slug: string) => `/categories/categories/slug/${slug}`,
    }
}