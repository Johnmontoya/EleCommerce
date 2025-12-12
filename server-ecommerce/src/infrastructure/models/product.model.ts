import { model, Schema } from "mongoose";

const variantSchema = new Schema({
  name: { type: String, required: true, default: '' },
  options: [{ type: String, required: false }],
});

const attributesSchema = new Schema({
  name: { type: String, required: true, default: '' },
  value: { type: String, required: true },
});

const dimensionSchema = new Schema({
  weight: { type: Number, required: true, default: 0 },
  width: { type: Number, required: true, default: 0 },
  height: { type: Number, required: true, default: 0 },
  depth: { type: Number, required: true, default: 0 },
});

const shippingSchema = new Schema({
  free: { type: Boolean, required: true, default: false },
  cost: { type: Number, required: true },
});

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  priceDiscount: { type: Number, required: false },
  stock: { type: Number, required: true },
  sku: { type: String, required: false },
  barcode: { type: String, required: false },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  rating: { type: Number, required: false },
  reviewsCount: { type: Number, required: false },
  variants: [variantSchema],
  attributes: [attributesSchema],
  dimensions: dimensionSchema,
  shipping: shippingSchema,
  isDigital: { type: Boolean, required: false },
  digitalFile: { type: String, required: false },
  relatedProducts: [{ type: String, required: false }],
  soldCount: { type: Number, required: false },
  isPublished: { type: Boolean, required: false }
});

export const ProductModel = model("Product", productSchema);
