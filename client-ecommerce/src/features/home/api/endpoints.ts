export const endpoints = {
    showcase: {
        banner: '/showcase/showcase/banner',
        featured: '/showcase/showcase/featured',
        promotional: '/showcase/showcase/promotional',
        section: (section: string) => `/showcase/showcase/${section}`,
        addToSection: (productId: string, section: string) => `/showcase/showcase/${productId}/add-to-section/${section}`,
        removeFromSection: (productId: string, section: string) => `/showcase/showcase/${productId}/remove-from-section/${section}`,
    }
}