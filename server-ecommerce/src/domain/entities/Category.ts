export interface Category {
    name: string;
    slug: string;
    image: string;
    description?: string | undefined;
    parentId?: string | undefined;
    isActive: boolean;
}

export class CategoryEntity implements Category {
    constructor(
        public readonly id: string,
        public name: string,
        public slug: string,
        public image: string,
        public isActive: boolean = true,
        public description?: string,
        public parentId?: string,
    ) { }

    static create(props: Omit<Category, 'id'>): CategoryEntity {
        const id = crypto.randomUUID();
        return new CategoryEntity(
            id,
            props.name,
            props.slug,
            props.image,
            props.isActive,
            props.description,
            props.parentId,
        );
    }
}
