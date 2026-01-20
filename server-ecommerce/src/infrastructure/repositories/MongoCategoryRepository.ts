import { CategoryEntity } from "../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";
import type { ProductFilters } from "../../domain/repositories/IProductRepository.js";
import { CategoryModel } from "../models/category.model.js";

export class MongoCategoryRepository implements ICategoryRepository {
    async create(category: CategoryEntity): Promise<CategoryEntity> {
        try {
            const newCategory = new CategoryModel(category);
            const saved = await newCategory.save();
            console.log("newCategory", saved)
            return this.mapToEntity(saved);
        } catch (error) {
            throw error;
        }
    }
    async findById(id: string): Promise<CategoryEntity | null> {
        try {
            const category = await CategoryModel.findById(id);
            return category ? this.mapToEntity(category) : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(filters?: ProductFilters): Promise<CategoryEntity[]> {
        try {
            const query: any = {}

            if (filters?.isPublished !== undefined) {
                query.isActive = filters.isPublished;
            }
            const categories = await CategoryModel.find(query);
            return categories.map(c => this.mapToEntity(c));
        } catch (error) {
            throw error;
        }
    }

    async update(id: string, category: CategoryEntity): Promise<CategoryEntity | null> {
        try {
            const updated = await CategoryModel.findByIdAndUpdate(id, category, { new: true });
            return updated ? this.mapToEntity(updated) : null;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const deleted = await CategoryModel.findByIdAndDelete(id);
            return deleted !== null;
        } catch (error) {
            throw error;
        }
    }

    async deleteMany(ids: string[]): Promise<boolean> {
        try {
            const deleted = await CategoryModel.deleteMany({ _id: { $in: ids } });
            return deleted.deletedCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async findBySlug(slug: string): Promise<CategoryEntity | null> {
        try {
            const category = await CategoryModel.findOne({ slug });
            return category ? this.mapToEntity(category) : null;
        } catch (error) {
            throw error;
        }
    }

    private mapToEntity(doc: any): CategoryEntity {
        return new CategoryEntity(
            doc._id?.toString() || doc.id,
            doc.name,
            doc.slug,
            doc.image,
            doc.isActive,
            doc.description,
            doc.parentId,

        )
    }
}