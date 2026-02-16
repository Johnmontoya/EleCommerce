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

export interface Images {
  url: string;
  fileId: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceDiscount: number;
  stock: number;
  brand: string;
  sku?: string | undefined;
  barcode?: string | undefined;
  images: Images[];
  category: string;
  tags: string[];
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
  displaySections?: DisplaySection[] | undefined;  // Dónde aparece este producto
  displayPriority?: number | undefined;            // Orden (1 = primero)
  isFeatured?: boolean | undefined;                // Quick flag para destacados
  promotionalData?: PromotionalData | undefined;   // Datos de promoción
  featuredUntil?: Date | undefined;
}

export class ProductEntity implements Product {
  constructor(
    public id: string,
    public name: string,
    public slug: string,
    public description: string,
    public price: number,
    public priceDiscount: number,
    public stock: number,
    public brand: string,
    public images: Images[],
    public category: string,
    public tags: string[],
    public barcode?: string,
    public sku?: string,
    public rating?: number,
    public reviewsCount?: number,
    public variants?: Variant[],
    public attributes?: Attribute[],
    public dimensions?: Dimensions,
    public shipping?: Shipping,
    public isDigital?: boolean,
    public digitalFile?: string,
    public relatedProducts?: string[],
    public soldCount?: number,
    public isPublished?: boolean,
    public displaySections?: DisplaySection[],
    public displayPriority?: number,
    public isFeatured?: boolean,
    public promotionalData?: PromotionalData,
    public featuredUntil?: Date
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
      props.images,
      props.category,
      props.tags,
      props.barcode,
      props.sku,
      props.rating,
      props.reviewsCount,
      props.variants,
      props.attributes,
      props.dimensions,
      props.shipping,
      props.isDigital,
      props.digitalFile,
      props.relatedProducts,
      props.soldCount,
      props.isPublished,
      props.displaySections,
      props.displayPriority,
      props.isFeatured,
      props.promotionalData,
      props.featuredUntil
    );
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