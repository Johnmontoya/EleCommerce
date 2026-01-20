import type z from "zod";
import type { CategoryIdSchema, CreateCategorySchema, UpdateCategorySchema } from "../../infrastructure/validation/Category.schema.js";

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type CategoryIdInput = z.infer<typeof CategoryIdSchema>;
