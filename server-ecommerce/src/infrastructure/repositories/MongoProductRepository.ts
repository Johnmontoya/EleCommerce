import type { BannerResponse, CreateBannerInput } from "../../application/Dto/product.dto.js";
import main from "../../config/gemini.js";
import { ProductEntity } from "../../domain/entities/Product.js";
import type { AnalyzeTitle, AnalyzeTitleResponse, IProductrepository, ProductFilters } from "../../domain/repositories/IProductRepository.js";
import { ProductModel } from "../models/product.model.js";

export class MongoProductRepository implements IProductrepository {
  async create(product: ProductEntity): Promise<ProductEntity> {
    try {
      const newProduct = new ProductModel(product);
      const saved = await newProduct.save();
      return this.mapToEntity(saved);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ProductEntity | null> {
    try {
      const product = await ProductModel.findById(id);
      return product ? this.mapToEntity(product) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters?: ProductFilters): Promise<ProductEntity[]> {
    try {
      const query: any = {};

      if (filters) {
        if (filters.category) query.category = filters.category;

        let brandsToFilter: string[] = [];

        if (filters.brands && Array.isArray(filters.brands) && filters.brands.length > 0) {
          brandsToFilter = filters.brands;
        } else if (filters.brand) {
          brandsToFilter = [filters.brand];
        }

        if (brandsToFilter.length > 0) {
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

      const queryBuilder = ProductModel.find(query).populate('category');

      if (filters?.limit) {
        queryBuilder.limit(filters.limit);
      }
      if (filters?.offset) {
        queryBuilder.skip(filters.offset);
      }

      const products = await queryBuilder.exec();

      const mappedProducts = products.map(p => this.mapToEntity(p));

      return mappedProducts;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, productData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    try {
      const updated = await ProductModel.findByIdAndUpdate(
        id,
        productData,
        { new: true, runValidators: true }
      );
      return updated ? this.mapToEntity(updated) : null;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    try {
      const result = await ProductModel.deleteMany({ _id: { $in: ids } });
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    try {
      const product = await ProductModel.findOne({ slug });
      return product ? this.mapToEntity(product) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByCategory(category: string): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({ category });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      throw error;
    }
  }

  async findByBrand(brand: string): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({ brand });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      throw error;
    }
  }

  async getAllBanners(): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find();
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      throw error;
    }
  }

  async updateBanner(id: string, banner: Partial<ProductEntity>): Promise<ProductEntity | null> {
    try {
      const updated = await ProductModel.findByIdAndUpdate(
        id,
        banner,
        { new: true, runValidators: true }
      );
      return updated ? this.mapToEntity(updated) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteBanner(id: string): Promise<boolean> {
    try {
      const result = await ProductModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw error;
    }
  }

  async getPromotional(): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({
        displaySections: {
          $in: ['promotional']
        }
      });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      throw error;
    }
  }

  async getShowcase(): Promise<ProductEntity[]> {
    try {
      const products = await ProductModel.find({
        displaySections: {
          $in: ['featured']
        }
      });
      return products.map(p => this.mapToEntity(p));
    } catch (error) {
      throw error;
    }
  }

  async analyzeTitle(title: string): Promise<AnalyzeTitleResponse> {
    try {
      const prompt = `Analiza el siguiente titulo del producto: ${title}. 
      Devuelve un SOLO objeto JSON válido (sin markdown, sin explicaciones) con la siguiente estructura exacta:
      {
        "name": "nombre del producto",
        "slug": "slug del producto en minusculas y guiones medios en vez de espacios",
        "description": "descripcion detallada del producto",
        "price": precio del producto en $COP,
        "priceDiscount": precio con descuento del producto en porcentaje,
        "stock": stock del producto,
        "category": "categoria del producto debe ser una de estas dependiendo del producto: Consolas, Celulares, Tablets, Smartwatch, Computadoras, Audio",
        "brand": "marca del producto",
        "tags": Una o dos etiquetas relacionadas con el producto, presentadas en un array de strings, por ejemplo: ["tag1", "tag2"],
        "dimensions": {
          "weight": peso del producto en kg,
          "width": ancho del producto en cm,
          "height": altura del producto en cm,
          "depth": profundidad del producto en cm
        },
        "shipping": {
          "free": true,
          "cost": costo del envio en $COP
        },
        "reviewsCount": 100,
        "rating": 4.5,
        "sku": "codigo unico de 12 digitos formado por letras y numeros",
        "barcode": "codigo de barras puede ser inventado",
        "variants": [
          {
            "name": "Puede ser Color, Tamaño, etc",
            "options": Las opciones de la variante en un array de strings, por ejemplo: ["option1", "option2", "option3"]
          }
        ],
        "attributes": [
          {
            "name": "Atributo del producto",
            "value": "valor del atributo"
          }
        ],
        "soldCount": 1,
        "isPublished": true
      }
      Importante: Debes devolver un JSON válido, sin markdown, sin explicaciones, sin saltos de línea, sin comillas simples, sin comillas dobles, sin nada más que el JSON.
      `;
      const response = await main(prompt);
      let jsonString = response!.trim();

      // Remover bloques de código markdown si existen
      jsonString = jsonString.replace(/```json\s*/g, '');
      jsonString = jsonString.replace(/```\s*/g, '');

      // Intentar parsear el JSON
      const productData = JSON.parse(jsonString);

      return {
        name: productData.name || title,
        slug: productData.slug,
        description: productData.description,
        price: productData.price,
        priceDiscount: productData.priceDiscount,
        stock: productData.stock,
        brand: productData.brand,
        category: productData.category,
        tags: productData.tags,
        dimensions: productData.dimensions,
        shipping: productData.shipping,
        reviewsCount: productData.reviewsCount,
        rating: productData.rating,
        sku: productData.sku,
        barcode: productData.barcode,
        variants: productData.variants,
        attributes: productData.attributes,
        soldCount: productData.soldCount,
        isPublished: productData.isPublished
      }
    } catch (error) {
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