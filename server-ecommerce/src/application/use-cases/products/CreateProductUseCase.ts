import { Product } from "../../../domain/entities/Product";
import type { IProductrepository } from "../../../domain/repositories/IProductRepository";
import type { CreateProductDto } from "../../Dto/product.dto";

export class CreateProductUseCase {
  constructor(private readonly repo: IProductrepository) {}

  async execute(data: CreateProductDto) {
    const newProduct = new Product(
      crypto.randomUUID(),
      data.name,
      data.slug,
      data.description,
      data.price,
      data.priceDiscount,
      data.stock,
      data.sku,
      data.barcode,
      data.brand,
      data.category,
      data.images,
      data.tags,
      data.rating,
      data.reviewsCount,
      data.variants,
      data.attributes,
      data.dimensions,
      data.shipping,
      data.isDigital,
      data.digitalFile,
      data.relatedProducts,
      data.soldCount,
      data.isPublished
    );

    await this.repo.save(newProduct);

    return newProduct;
  }
}
