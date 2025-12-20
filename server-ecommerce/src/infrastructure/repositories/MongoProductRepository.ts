import { ProductEntity } from "../../domain/entities/Product";
import type { IProductrepository, ProductFilters } from "../../domain/repositories/IProductRepository";
import { ProductModel } from "../models/product.model";

export class MongoProductRepository implements IProductrepository {

  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      console.log('Creating product:', product);
      const newProduct = new ProductModel(product);
      const saved = await newProduct.save();
      console.log('Product saved:', saved);
      return this.mapToEntity(saved);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      console.log('Finding product by id:', id);
      const product = await ProductModel.findById(id);
      console.log('Product found:', product);
      return product ? this.mapToEntity(product) : null;
    } catch (error) {
      console.error('Error finding product:', error);
      throw error;
    }
  }

  async findAll(filters?: ProductFilters): Promise<ProductEntity[]> {
    try {
      console.log('📦 findAll called with filters:', JSON.stringify(filters, null, 2));

      const query: any = {};

      if (filters) {
        if (filters.category) query.category = filters.category;

        // ✅ MEJORADO: Manejar brands de múltiples formas
        let brandsToFilter: string[] = [];

        if (filters.brands && Array.isArray(filters.brands) && filters.brands.length > 0) {
          brandsToFilter = filters.brands;
        } else if (filters.brand) {
          brandsToFilter = [filters.brand];
        }

        if (brandsToFilter.length > 0) {
          console.log('🏷️  Filtering by brands:', brandsToFilter);
          if (brandsToFilter.length === 1) {
            query.brand = brandsToFilter[0];
          } else {
            query.brand = { $in: brandsToFilter };
          }
        }

        if (filters.isPublished !== undefined) query.isPublished = filters.isPublished;

        if (filters.minPrice || filters.maxPrice) {
          query.price = {};
          if (filters.minPrice) query.price.$gte = filters.minPrice;
          if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        if (filters.search) {
          query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } },
            { tags: { $in: [new RegExp(filters.search, 'i')] } },
          ];
        }
      }

      console.log('🔍 MongoDB query:', JSON.stringify(query, null, 2));

      const queryBuilder = ProductModel.find(query).populate('category');

      if (filters?.limit) {
        console.log('📊 Applying limit:', filters.limit);
        queryBuilder.limit(filters.limit);
      }
      if (filters?.offset) {
        console.log('📊 Applying offset:', filters.offset);
        queryBuilder.skip(filters.offset);
      }

      const products = await queryBuilder.exec();
      console.log('✅ Products found in DB:', products.length);

      const mappedProducts = products.map(p => this.mapToEntity(p));
      console.log('🎯 Mapped products:', mappedProducts.length);

      return mappedProducts;
    } catch (error) {
      console.error('❌ Error finding all products:', error);
      throw error;
    }
  }

  async update(id: string, productData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    try {
      console.log('Updating product:', id, productData);

      const updated = await ProductModel.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
      );

      console.log('Product updated:', updated);
      return updated ? this.mapToEntity(updated) : null;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      console.log('Deleting product:', id);
      const result = await ProductModel.findByIdAndDelete(id);
      console.log('Product deleted:', result);
      return result !== null;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    try {
      console.log('Finding product by slug:', slug);
      const product = await ProductModel.findOne({ slug });
      console.log('Product found:', product);
      return product ? this.mapToEntity(product) : null;
    } catch (error) {
      console.error('Error finding product by slug:', error);
      throw error;
    }
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({ category });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      console.error('Error finding products by category:', error);
      throw error;
    }
  }

  async findByBrand(brand: string): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({ brand });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      console.error('Error finding products by brand:', error);
      throw error;
    }
  }

  private mapToEntity(doc: any): ProductEntity {
    return new ProductEntity(
      doc._id?.toString() || doc.id,
      doc.name,
      doc.slug,
      doc.description,
      doc.price,
      doc.priceDiscount,
      doc.stock,
      doc.brand,
      doc.category,
      doc.images,
      doc.tags,
      doc.dimensions,
      doc.shipping,
      doc.reviewsCount,
      doc.rating,
      doc.sku,
      doc.barcode,
      doc.variants,
      doc.attributes,
      doc.isDigital,
      doc.digitalFile,
      doc.relatedProducts,
      doc.soldCount,
      doc.isPublished,
      doc.displaySections,
      doc.displayPriority,
      doc.isFeatured,
      doc.promotionalData,
      doc.featuredUntil
    )
  }
}