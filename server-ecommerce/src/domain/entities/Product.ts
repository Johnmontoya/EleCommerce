import type { Attribute, Dimensions, Shipping, Variant } from "../repositories/IProductRepository";

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public price: number,
    public priceDiscount: number,
    public stock: number,
    public sku: string,
    public barcode: string,
    public brand: string,
    public category: string,
    public images: string[],
    public tags: string[],
    public rating: number,
    public reviewsCount: number,
    public variants: Variant[],
    public attributes: Attribute[],
    public dimensions: Dimensions,
    public shipping: Shipping,
    public isDigital: boolean,
    public digitalFile: string,
    public relatedProducts: string[],
    public soldCount: number,
    public isPublished: boolean,
  ) {}

  decreaseStock(amount: number) {
    if (amount > this.stock) {
      throw new Error("No tenemos stock suficiente");
    }
    this.stock -= amount;
  }
}
