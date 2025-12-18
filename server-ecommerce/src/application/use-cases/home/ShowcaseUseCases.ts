import type { ProductEntity } from "../../../domain/entities/Product";
import type { IProductrepository } from "../../../domain/repositories/IProductRepository";

export class GetBannerProductsUseCase {
    constructor(private productRepository: IProductrepository) { }

    async execute(limit: number = 5): Promise<ProductEntity[]> {
        const products = await this.productRepository.findAll({
            limit,
            isPublished: true
        });

        return products
            .filter(p => p.displaySections?.includes('banner'))
            .filter(p => p.isActiveInSection("banner"))
            .sort((a, b) => (a.displayPriority || 999) - (b.displayPriority || 999))
            .slice(0, limit);
    }
}