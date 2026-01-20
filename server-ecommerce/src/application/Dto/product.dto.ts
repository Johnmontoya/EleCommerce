import type z from "zod";
import type { CreateBannerSchema, CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "../../infrastructure/validation/Product.schema.js";

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type ProductIdInput = z.infer<typeof ProductIdSchema>;
export type CreateBannerInput = z.infer<typeof CreateBannerSchema>;

export interface ProductAutocompleteDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceDiscount?: number | undefined;
  category: string;
  image?: string | undefined; // Primera imagen
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