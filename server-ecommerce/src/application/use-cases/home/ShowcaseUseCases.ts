import type { ProductEntity } from "../../../domain/entities/Product";
import type { IProductrepository } from "../../../domain/repositories/IProductRepository";

export class GetBannerProductsUseCase {
    constructor(private productRepository: IProductrepository) { }

    async execute(): Promise<ProductEntity[]> {
        const products = await this.productRepository.findAll({
            isPublished: true
        });

        return products
            .filter(p => p.displaySections?.includes('banner'))
            .filter(p => p.isActiveInSection("banner"))
            .sort((a, b) => (a.displayPriority || 999) - (b.displayPriority || 999));
    }
}

export class GetPromotionalProductsUseCase {
    constructor(private productRepository: IProductrepository) { }

    async execute(): Promise<ProductEntity[]> {
        const products = await this.productRepository.findAll({
            isPublished: true
        });

        return products
            .filter(p => p.displaySections?.includes('promotional'))
            .filter(p => p.isActiveInSection("promotional"))
            .sort((a, b) => (a.displayPriority || 999) - (b.displayPriority || 999))
            .slice(0, 5);
    }
}

export class GetTrendsProductUseCase {
    constructor(private productRepository: IProductrepository) { }

    async execute(): Promise<ProductEntity[]> {
        const products = await this.productRepository.findAll({
            isPublished: true
        });

        return products
            .filter(p => p.displaySections?.includes('trending'))
            .filter(p => p.isActiveInSection("trending"))
            .sort((a, b) => (a.displayPriority || 999) - (b.displayPriority || 999))
            .slice(0, 5);
    }
}