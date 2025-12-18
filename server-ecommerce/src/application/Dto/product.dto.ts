import type z from "zod";
import type { CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "../../infrastructure/validation/Product.schema";

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type ProductIdInput = z.infer<typeof ProductIdSchema>;

export interface ProductAutocompleteDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceDiscount?: number | undefined;
  category: string;
  image?: string | undefined; // Primera imagen
}