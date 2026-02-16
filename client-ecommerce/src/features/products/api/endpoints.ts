export const endpoints = {
    products: {
        list: '/products/products',
        detail: (id: string) => `/products/products/${id}`,
        bySlug: (slug: string) => `/products/products/slug/${slug}`,
        byCategory: (category: string) => `/products/products/category/${category}`,
        byBrand: (brand: string) => `/products/products/brand/${brand}`,
        search: '/products/products/search',
        create: '/products/products',
        update: (id: string) => `/products/products/${id}`,
        updatePublish: (id: string) => `/products/products/${id}/publish`,
        delete: (id: string) => `/products/products/${id}`,
        deleteMany: '/products/products',
        analyzeTitle: '/products/products/analyze-title',
    }
}