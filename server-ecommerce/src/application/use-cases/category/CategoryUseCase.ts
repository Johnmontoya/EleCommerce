import { CategoryEntity } from "../../../domain/entities/Category";
import type { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import type { ProductFilters } from "../../../domain/repositories/IProductRepository";
import type { CreateCategoryInput, UpdateCategoryInput } from "../../Dto/category.dto";

export class CreateCategoryUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(input: CreateCategoryInput): Promise<CategoryEntity> {
        const category = CategoryEntity.create(input);
        return await this.categoryRepository.create(category);
    }
}

export class UpdateCategoryUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(id: string, input: UpdateCategoryInput): Promise<CategoryEntity | null> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria no encontrada");
        }

        const updateData = Object.fromEntries(
            Object.entries(input).filter(([_, value]) => value !== undefined)
        ) as Partial<CategoryEntity>;

        return await this.categoryRepository.update(id, updateData);
    }
}

export class GetCategoryByIdUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(id: string): Promise<CategoryEntity | null> {
        return await this.categoryRepository.findById(id);
    }
}

export class GetAllCategoriesUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(filters?: ProductFilters): Promise<CategoryEntity[]> {
        return await this.categoryRepository.findAll(filters);
    }
}

export class DeleteCategoryUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(id: string): Promise<boolean> {
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new Error("Categoria no encontrada");
        }
        return await this.categoryRepository.delete(id);
    }
}

export class DeleteManyCategoriesUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(ids: string[]): Promise<boolean> {
        return await this.categoryRepository.deleteMany(ids);
    }
}

export class GetCategoryBySlugUseCase {
    constructor(private readonly categoryRepository: ICategoryRepository) { }

    async execute(slug: string): Promise<CategoryEntity | null> {
        return await this.categoryRepository.findBySlug(slug);
    }
}