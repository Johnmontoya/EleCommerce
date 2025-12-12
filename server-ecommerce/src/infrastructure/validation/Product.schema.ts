import z from "zod";
import { es } from "zod/locales";

z.config(es());

export const VarianSchema = z.object({
  name: z.string().nullable(),
  options: z.array(z.string()),
});

export const AttributeSchema = z.object({
  name: z.string().nullable(),
  value: z.string().nullable(),
});

export const DimensionsSchema = z.object({
  weight: z.number(),
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

export const ShippingSchema = z.object({
  free: z.boolean(),
  cost: z.number(),
});

export const createProductSchema = z.object({
  name: z
    .string({
      error: "No es una cadena de texto",
    })
    .min(3, {
      error: "Nombre demasiado corto",
    })
    .nonempty({ error: "El nombre es obligatorio" }),
  slug: z
    .string({
      error: "No es una cadena de texto",
    })
    .min(3, {
      error: "Slug demasiado corto",
    })
    .nonempty({ error: "El slug es obligatorio" }),
  description: z
    .string({
      error: "No es una cadena de texto",
    })
    .min(50, {
      error: "Descripcion demasiado corta",
    })
    .nonempty({ error: "Descripcion es obligatorio" }),
  price: z
    .number({
      error: "No es un valor numerico",
    })
    .positive({
      error: "Solo se aceptan valores positivos",
    }),
  priceDiscount: z
    .number({
      error: "No es un valor numerico",
    })
    .positive({
      error: "Solo se aceptan valores positivos",
    }),
  stock: z
    .number({
      error: "No es un valor numerico",
    })
    .min(1, {
      error: "Stock demasiado corto",
    })
    .positive({
      error: "Solo se aceptan valores positivos",
    }),
  sku: z
    .string({
      error: "No es una cadena de texto",
    })
    .min(3, {
      error: "Sku demasiado corto",
    })
    .nonempty({ error: "El Sku es obligatorio" }),
  barcode: z
    .string({
      error: "No es una cadena de texto",
    })
    .min(10, {
      error: "Codigo de barras demasiado corto",
    })
    .nonempty({ error: "El codigo de barras es obligatorio" }),
  brand: z
    .string({
      error: "No es una cadena de texto",
    })
    .nonempty({ error: "La marca es obligatoria" }),
  category: z
    .string({
      error: "No es una cadena de texto",
    })
    .nonempty({ error: "Ingresa la categoria" }),
  images: z.array(z.string()),
  tags: z.array(z.string()),
  rating: z.number(),
  reviewsCount: z.number(),
  variants: z.array(VarianSchema),
  attributes: z.array(AttributeSchema),
  dimensions: DimensionsSchema,
  shipping: ShippingSchema,
  isDigital: z.boolean(),
  digitalFile: z.string(),
  relatedProducts: z.array(z.string()),
  soldCount: z.number(),
  isPublished: z.boolean(),
});
