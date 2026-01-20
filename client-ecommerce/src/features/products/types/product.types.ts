import type { Category } from "../../categories/type/category.types";

export interface TabContent {
  title: string;
  content: string;
}

export type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

export interface PromotionalData {
  startDate?: string;
  endDate?: string;
  discount?: number;
  badgeText?: string;
  bannerImageUrl?: string;
}

export interface Variant {
  name: string;
  options: string[];
}

export interface Attribute {
  name: string | null;
  value: string | null;
}

export interface Brand {
  name: string;
  checked: boolean;
}

export interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export interface Shipping {
  free: boolean;
  cost: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: Category;
  images?: string[];
  image?: string;
  tags?: string[];
  priceDiscount?: number;
  sku?: string;
  barcode?: string;
  variants?: Variant[];
  attributes?: Attribute[];
  dimensions: Dimensions;
  shipping: Shipping;
  rating?: number;
  reviewsCount?: number;
  isPublished?: boolean;
  isDigital?: boolean;
  digitalFile?: string;
  relatedProducts?: string[];
  soldCount?: number;
  displaySections?: DisplaySection[];
  displayPriority?: number;
  isFeatured?: boolean;
  promotionalData?: PromotionalData;
  featuredUntil?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductAutocomplete {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceDiscount?: number;
  category: string;
  image?: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  isPublished?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  total?: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}