import z from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    slug: z.string().min(3, "El slug debe tener al menos 3 caracteres"),
    image: z.string().min(3, "Ingresa una imagen con fondo transparente"),
    description: z.string().optional(),
    parentId: z.string().optional(),
    isActive: z.boolean()
});

export const UpdateCategorySchema = CreateCategorySchema.partial().strict();
export const CategoryIdSchema = z.object({
    id: z.string().uuid('Id invalido para una categoria'),
});