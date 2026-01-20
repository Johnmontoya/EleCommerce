import type { Attribute, Dimensions, Shipping, Variant } from "../repositories/IProductRepository.js";

// Tipos para visualización
export type DisplaySection = 'banner' | 'featured' | 'trending' | 'promotional' | 'new-arrival';

export interface PromotionalData {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  discount?: number | undefined;
  badgeText?: string | undefined;        // "50% OFF", "NUEVO", etc.
  bannerImageUrl?: string | undefined;   // Imagen específica para banner
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceDiscount: number;
  stock: number;
  sku?: string | undefined;
  barcode?: string | undefined;
  brand: string;
  category: string;
  images: string[];
  tags: string[];
  rating?: number | undefined;
  reviewsCount?: number | undefined;
  variants?: Variant[] | undefined;
  attributes?: Attribute[] | undefined;
  dimensions: Dimensions;
  shipping: Shipping;
  isDigital?: boolean | undefined;
  digitalFile?: string | undefined;
  relatedProducts?: string[] | undefined;
  soldCount?: number | undefined;
  isPublished?: boolean | undefined;
  displaySections?: DisplaySection[] | undefined;  // Dónde aparece este producto
  displayPriority?: number | undefined;            // Orden (1 = primero)
  isFeatured?: boolean | undefined;                // Quick flag para destacados
  promotionalData?: PromotionalData | undefined;   // Datos de promoción
  featuredUntil?: Date | undefined;
}

export class ProductEntity implements Product {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public price: number,
    public priceDiscount: number,
    public stock: number,
    public brand: string,
    public category: string,
    public images: string[],
    public tags: string[],
    public dimensions: Dimensions,
    public shipping: Shipping,
    public reviewsCount?: number,
    public rating?: number,
    public sku?: string,
    public barcode?: string,
    public variants?: Variant[],
    public attributes?: Attribute[],
    public isDigital?: boolean,
    public digitalFile?: string,
    public relatedProducts?: string[],
    public soldCount?: number,
    public isPublished?: boolean,
    public displaySections?: DisplaySection[],
    public displayPriority?: number,
    public isFeatured?: boolean,
    public promotionalData?: PromotionalData,
    public featuredUntil?: Date,
  ) { }

  static create(props: Omit<Product, 'id'>): ProductEntity {
    const id = crypto.randomUUID();
    return new ProductEntity(
      id,
      props.name,
      props.slug,
      props.description,
      props.price,
      props.priceDiscount,
      props.stock,
      props.brand,
      props.category,
      props.images,
      props.tags,
      props.dimensions,
      props.shipping,
      props.reviewsCount,
      props.rating,
      props.sku,
      props.barcode,
      props.variants,
      props.attributes,
      props.isDigital,
      props.digitalFile,
      props.relatedProducts,
      props.soldCount,
      props.isPublished,
      props.displaySections,
      props.displayPriority,
      props.isFeatured,
      props.promotionalData,
      props.featuredUntil,
    );
  }

  isActiveInSection(section: DisplaySection): boolean {
    if (!this.displaySections?.includes(section)) {
      return false;
    }

    if (section === 'featured' && this.featuredUntil) {
      return new Date() <= this.featuredUntil;
    }

    if (section === 'promotional' && this.promotionalData?.endDate) {
      return new Date() <= this.promotionalData.endDate;
    }

    return true;
  }

  /*
    updateStock(quantity: number): void {
      this.stock = quantity
    }
  
    applyDiscount(discount: number): void {
      this.priceDiscount = discount;
    }
  
    publish(): void {
      this.isPublished = true;
    }
  
    unpublish(): void {
      this.isPublished = false;
    }*/
}