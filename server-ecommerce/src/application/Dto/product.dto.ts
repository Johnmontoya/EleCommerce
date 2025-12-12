import type z from "zod";
import type { createProductSchema } from "../../infrastructure/validation/Product.schema";

export type CreateProductDto = z.infer<typeof createProductSchema>;