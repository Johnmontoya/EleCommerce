import type { BannerResponse, CreateBannerInput } from "../../application/Dto/product.dto";
import { ProductEntity } from "../entities/Product";

export interface IProductrepository {
  create(product: ProductEntity): Promise<ProductEntity>;
  findById(id: string): Promise<ProductEntity | null>;
  findAll(filters?: ProductFilters): Promise<ProductEntity[]>;
  update(id: string, product: Partial<ProductEntity>): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
  deleteMany(ids: string[]): Promise<boolean>;
  findBySlug(slug: string): Promise<ProductEntity | null>;
  findByCategory(category: string): Promise<ProductEntity[]>;
  findByBrand(brand: string): Promise<ProductEntity[]>;
  getAllBanners(): Promise<ProductEntity[]>;
  updateBanner(id: string, banner: Partial<ProductEntity>): Promise<ProductEntity | null>;
  deleteBanner(id: string): Promise<boolean>;
  getShowcase(): Promise<ProductEntity[]>;
}

export interface Variant {
  name: string;
  options: string[];
}

export interface Attribute {
  name: string | null;
  value: string | null;
}

export interface Dimensions {
  weight: number;
  width: number;
  height: number;
  depth: number;
}

export interface Shipping {
  free: boolean;
  cost: number;
}

export interface ProductFilters {
  category?: string;
  brands?: string[] | undefined;
  brand?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  isPublished?: boolean;
  search?: string;
  limit?: number | undefined;
  offset?: number | undefined;
}
