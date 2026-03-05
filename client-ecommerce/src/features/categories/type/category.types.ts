export interface Category {
    [key: string]: unknown;
    id?: string;
    name: string;
    slug: string;
    image: string;
    description?: string | undefined;
    parentId?: string | undefined;
    isActive: boolean;
}

export interface CategoryFilters {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
}