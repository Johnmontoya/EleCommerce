import type { CreateProductDto } from "../../application/Dto/product.dto";
import { Product } from "../../domain/entities/Product";
import type { IProductrepository } from "../../domain/repositories/IProductRepository";
import { ProductModel } from "../models/product.model";

export class MongoProductRepository implements IProductrepository {
  async findById(id: string): Promise<Product | null> {
    const doc = await ProductModel.findOne({ id }).lean();
    if (!doc) return null;

    return new Product(
      doc.id,
      doc.name,
      doc.slug,
      doc.description,
      doc.price,
      doc.priceDiscount!,
      doc.stock,
      doc.sku!,
      doc.barcode!,
      doc.brand,
      doc.category,
      doc.images,
      doc.tags,
      doc.rating!,
      doc.reviewsCount!,
      doc.variants,
      doc.attributes,
      doc.dimensions!,
      doc.shipping!,
      doc.isDigital!,
      doc.digitalFile!,
      doc.relatedProducts,
      doc.soldCount!,
      doc.isPublished!
    );
  }

  async save(product: CreateProductDto): Promise<void> {
    await ProductModel.create(product);
  }

  async findAll(): Promise<Product[]> {
    const docs = await ProductModel.find();
    return docs.map(
      (doc) =>
        new Product(
          doc.id,
          doc.name,
          doc.slug,
          doc.description,
          doc.price,
          doc.priceDiscount!,
          doc.stock,
          doc.sku!,
          doc.barcode!,
          doc.brand,
          doc.category,
          doc.images,
          doc.tags,
          doc.rating!,
          doc.reviewsCount!,
          doc.variants,
          doc.attributes,
          doc.dimensions!,
          doc.shipping!,
          doc.isDigital!,
          doc.digitalFile!,
          doc.relatedProducts,
          doc.soldCount!,
          doc.isPublished!
        )
    );
  }

  async update(id: string, product: Product): Promise<Product | null> {
    const doc = await ProductModel.findOneAndUpdate({ id }, product, {
      new: true,
    });
    if (!doc) return null;

    return new Product(
      doc.id,
      doc.name,
      doc.slug,
      doc.description,
      doc.price,
      doc.priceDiscount!,
      doc.stock,
      doc.sku!,
      doc.barcode!,
      doc.brand,
      doc.category,
      doc.images,
      doc.tags,
      doc.rating!,
      doc.reviewsCount!,
      doc.variants,
      doc.attributes,
      doc.dimensions!,
      doc.shipping!,
      doc.isDigital!,
      doc.digitalFile!,
      doc.relatedProducts,
      doc.soldCount!,
      doc.isPublished!
    );
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ProductModel.findOneAndDelete({ id });
    return deleted !== null;
  }
}
