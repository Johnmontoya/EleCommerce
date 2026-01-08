export const endpoints = {
    showcase: {
        banner: '/showcase/showcase/banner',
        trends: '/showcase/showcase/trends',
        promotional: '/showcase/showcase/promotional',
        showcase: '/products/showcase',
        section: (section: string) => `/showcase/showcase/${section}`,
        addToSection: (productId: string, section: string) => `/showcase/showcase/${productId}/add-to-section/${section}`,
        removeFromSection: (productId: string, section: string) => `/showcase/showcase/${productId}/remove-from-section/${section}`,
    }
}