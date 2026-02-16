import type z from "zod";
import type { CreateBannerSchema, CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "../../infrastructure/validation/Product.schema.js";
import type { Attribute, Dimensions, Shipping, Variant } from "../../domain/repositories/IProductRepository.js";

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type ProductIdInput = z.infer<typeof ProductIdSchema>;
export type CreateBannerInput = z.infer<typeof CreateBannerSchema>;

export interface ProductAutocompleteDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: { url: string, fileId: string }[];
  //priceDiscount?: number | undefined;
  //category: string;
  //image?: string | undefined; // Primera imagen
}

type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

interface PromotionalData {
  startDate?: string;
  endDate?: string;
  discount?: number;
  badgeText?: string;
  bannerImageUrl?: string;
}

export interface BannerResponse {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  displaySections: DisplaySection[];
  displayPriority: number;
  isFeatured: boolean;
  promotionalData?: PromotionalData;
  featuredUntil?: string;
}

export interface CreateProduct {
  name: string;
  images: { url: string, fileId: string }[];
  price: number;
  slug: string;
  description: string;
  priceDiscount: number;
  stock: number;
  brand: string;
  category: string;
  tags: string[];
  sku?: string;
  barcode?: string;
  rating?: number | undefined;
  reviewsCount?: number | undefined;
  variants?: Variant[] | undefined;
  attributes?: Attribute[] | undefined;
  dimensions?: Dimensions | undefined;
  shipping?: Shipping | undefined;
  isDigital?: boolean | undefined;
  digitalFile?: string | undefined;
  relatedProducts?: string[] | undefined;
  soldCount?: number | undefined;
  isPublished?: boolean | undefined;
  displaySections?: DisplaySection[] | undefined;
  displayPriority?: number | undefined;
  isFeatured?: boolean | undefined;
  featuredUntil?: Date | undefined;
}