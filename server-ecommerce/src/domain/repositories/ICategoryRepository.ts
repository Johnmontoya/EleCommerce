import type { CategoryEntity } from "../entities/Category.js";
import type { ProductFilters } from "./IProductRepository.js";

export interface ICategoryRepository {
    create(category: CategoryEntity): Promise<CategoryEntity>;
    findById(id: string): Promise<CategoryEntity | null>;
    findAll(filters?: ProductFilters): Promise<CategoryEntity[]>;
    update(id: string, category: Partial<CategoryEntity>): Promise<CategoryEntity | null>;
    delete(id: string): Promise<boolean>;
    deleteMany(ids: string[]): Promise<boolean>;
    findBySlug(slug: string): Promise<CategoryEntity | null>;
}