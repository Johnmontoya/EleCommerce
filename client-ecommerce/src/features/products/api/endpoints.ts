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
        delete: (id: string) => `/products/products/${id}`,
    }
}