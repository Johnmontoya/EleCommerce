import z from "zod";
import { es } from "zod/locales";

z.config(es());

// Schemas compartidos
export const VariantsSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  options: z.array(z.string()),
});

export const AttributeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  value: z.string().min(1, 'El valor es requerido'),
});

export const DimensionsSchema = z.object({
  weight: z.number().min(0, 'El peso debe ser positivo').default(0),
  width: z.number().min(0, 'El ancho debe ser positivo').default(0),
  height: z.number().min(0, 'La altura debe ser positiva').default(0),
  depth: z.number().min(0, 'La profundidad debe ser positiva').default(0),
});

export const ShippingSchema = z.object({
  free: z.boolean().default(false),
  cost: z.number().min(0, 'El costo debe ser positivo'),
});

export const PromotionalDataSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  discount: z.number().min(0).max(100).optional(),
  badgeText: z.string().max(50).optional(),
  bannerImageUrl: z.string().url().optional(),
}).optional();

// ✨ Enum para secciones de display
export const DisplaySectionEnum = z.enum([
  'banner',
  'featured',
  'trending',
  'promotional',
  'new-arrival'
]);

export const ImagesSchema = z.object({
  url: z.string().url("URL de imagen inválida"),
  fileId: z.string().min(1, "File ID es requerido"),
});


export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Es requerido el nombre del producto').max(200),
  slug: z.string().min(1, 'Es requerido el slug').regex(/^[a-z0-9-]+$/, 'Formato de slug inválido'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser positivo'),
  images: z.array(ImagesSchema).optional(),
  priceDiscount: z.number().min(0),
  stock: z.number().int().min(0, 'El stock debe ser un número positivo'),
  sku: z.string(),
  barcode: z.string(),
  brand: z.string().min(1, 'Es requerido la marca'),
  category: z.string().min(1, 'Es requerida la categoría'),
  tags: z.array(z.string()).default([]),
  rating: z.number().min(0).max(5).optional(),
  reviewsCount: z.number().int().min(0).optional(),
  variants: z.array(VariantsSchema).optional(),
  attributes: z.array(AttributeSchema).optional(),
  dimensions: DimensionsSchema.optional(),
  shipping: ShippingSchema.optional(),
  isDigital: z.boolean().optional(),
  digitalFile: z.string().optional(),
  relatedProducts: z.array(z.string()).optional(),
  soldCount: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
  displaySections: z.array(DisplaySectionEnum).optional(),
  displayPriority: z.number().int().min(1).max(999).optional(),
  isFeatured: z.boolean().optional(),
  promotionalData: PromotionalDataSchema,
  featuredUntil: z.coerce.date().optional()
});

export const UpdateProductSchema = CreateProductSchema.partial().strict();

// Schema para agregar/remover de secciones
export const ManageSectionSchema = z.object({
  priority: z.number().int().min(1).max(999).optional(),
});

// QUERY/FILTER - Para búsquedas
export const ProductQuerySchema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  isPublished: z.coerce.boolean().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
  offset: z.coerce.number().int().min(0).default(0).optional(),
});

export const ProductIdSchema = z.object({
  id: z.string().uuid('Id invalido para un producto'),
});

export const CreateBannerSchema = z.object({
  productId: z.string().uuid('Id invalido para un producto'),
  productName: z.string().min(1, 'El nombre es requerido'),
  productImage: z.string().url('Formato de URL inválido'),
  displaySections: z.array(DisplaySectionEnum).optional(),
  displayPriority: z.number().int().min(1).max(999).optional(),
  isFeatured: z.boolean(),
  promotionalData: PromotionalDataSchema.nullable(),
  featuredUntil: z.coerce.date().nullable(),
});
