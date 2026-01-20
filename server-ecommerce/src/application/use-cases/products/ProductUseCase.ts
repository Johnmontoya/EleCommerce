import { ProductEntity } from "../../../domain/entities/Product.js";
import type {
  IProductrepository,
  ProductFilters,
} from "../../../domain/repositories/IProductRepository.js";
import type { CreateProductInput, ProductAutocompleteDto, UpdateProductInput } from "../../Dto/product.dto.js";

export class CreateProductUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(input: CreateProductInput): Promise<ProductEntity> {
    const product = ProductEntity.create(input);
    return await this.productRepository.create(product);
  }
}

export class GetProductByIdUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(id: string): Promise<ProductEntity | null> {
    return await this.productRepository.findById(id);
  }
}

export class GetAllProductsUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(filters?: ProductFilters): Promise<ProductEntity[]> {
    return await this.productRepository.findAll(filters);
  }
}

export class UpdateProductUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(
    id: string,
    input: UpdateProductInput
  ): Promise<ProductEntity | null> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      return null;
    }

    if (input.slug && input.slug !== existingProduct.slug) {
      const duplicateSlug = await this.productRepository.findBySlug(input.slug);
      if (duplicateSlug && duplicateSlug.id !== id) {
        throw new Error('Ya hay un slug con esos datos');
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(input).filter(([_, value]) => value !== undefined)
    ) as Partial<ProductEntity>;

    return await this.productRepository.update(id, updateData);
  }
}

export class DeleteProductUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(id: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      return false;
    }

    return await this.productRepository.delete(id);
  }
}

export class DeleteManyProductsUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(ids: string[]): Promise<boolean> {
    return await this.productRepository.deleteMany(ids);
  }
}

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(slug: string): Promise<ProductEntity | null> {
    return await this.productRepository.findBySlug(slug);
  }
}

export class GetProductsByCategoryUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(category: string): Promise<ProductEntity[]> {
    return await this.productRepository.findByCategory(category);
  }
}

export class GetProductsByBrandUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(brand: string): Promise<ProductEntity[]> {
    return await this.productRepository.findByBrand(brand);
  }
}

export class GetBannersUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(): Promise<ProductEntity[]> {
    return await this.productRepository.getAllBanners();
  }
}

export class UpdateBannerUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(id: string, banner: Partial<ProductEntity>): Promise<ProductEntity | null> {
    return await this.productRepository.updateBanner(id, banner);
  }
}

export class DeleteBannerUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(id: string): Promise<boolean> {
    return await this.productRepository.deleteBanner(id);
  }
}

export class GetShowcaseUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(): Promise<ProductEntity[]> {
    return await this.productRepository.getShowcase();
  }
}

export class SearchProductsAutoCompleteUseCase {
  constructor(private productRepository: IProductrepository) { }

  async execute(term: string): Promise<ProductAutocompleteDto[]> {
    const products = await this.productRepository.findAll({
      search: term,
      limit: 5,
      isPublished: true
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      priceDiscount: product.priceDiscount,
      category: product.category,
      image: product.images[0]
    }));
  }
}
