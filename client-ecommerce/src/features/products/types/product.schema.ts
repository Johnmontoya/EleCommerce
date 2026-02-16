import { z } from 'zod';

// Schema para dimensiones
const DimensionsSchema = z.object({
    weight: z.number().min(0, 'El peso debe ser mayor o igual a 0'),
    width: z.number().min(0, 'El ancho debe ser mayor o igual a 0'),
    height: z.number().min(0, 'El alto debe ser mayor o igual a 0'),
    depth: z.number().min(0, 'La profundidad debe ser mayor o igual a 0'),
});

// Schema para envío
const ShippingSchema = z.object({
    free: z.boolean(),
    cost: z.number().min(0, 'El costo debe ser mayor o igual a 0'),
});

// Schema para variantes
const VariantSchema = z.object({
    name: z.string().min(1, 'El nombre de la variante es requerido'),
    options: z.array(z.string()).min(1, 'Debe tener al menos una opción'),
});

// Schema para atributos
const AttributeSchema = z.object({
    name: z.string().min(1, 'El nombre del atributo es requerido'),
    value: z.string().min(1, 'El valor del atributo es requerido'),
});

const ImageSchema = z.object({
    url: z.string().url('URL de imagen inválida'),
    fileId: z.string().optional(),
});

// Schema principal del producto
export const ProductSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    slug: z.string().min(3, 'El slug debe tener al menos 3 caracteres'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
    priceDiscount: z.number().min(0).max(100, 'El descuento debe estar entre 0 y 100'),
    stock: z.number().int().min(0, 'El stock debe ser mayor o igual a 0'),
    sku: z.string().min(1, 'El SKU es requerido'),
    barcode: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().min(1, 'La categoría es requerida'),
    images: z.array(ImageSchema),
    tags: z.array(z.string()),
    rating: z.number().min(0).max(5),
    reviewsCount: z.number().int().min(0),
    variants: z.array(VariantSchema),
    attributes: z.array(AttributeSchema),
    dimensions: DimensionsSchema,
    shipping: ShippingSchema,
    isDigital: z.boolean(),
    digitalFile: z.string().optional(),
    relatedProducts: z.array(z.string()),
    soldCount: z.number().int().min(0),
    isPublished: z.boolean(),
});

export const ProductSchemaUpdate = ProductSchema.partial();

export type ProductSchemaType = z.infer<typeof ProductSchema>;
export type ProductSchemaUpdateType = z.infer<typeof ProductSchemaUpdate>;
