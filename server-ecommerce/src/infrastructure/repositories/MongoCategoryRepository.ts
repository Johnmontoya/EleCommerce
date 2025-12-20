import { CategoryEntity } from "../../domain/entities/Category";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { CategoryModel } from "../models/category.model";

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

    async findAll(): Promise<CategoryEntity[]> {
        try {
            const categories = await CategoryModel.find();
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