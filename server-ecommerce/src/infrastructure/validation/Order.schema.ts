import z from "zod";

export const OrderItemSchema = z.object({
    productId: z.string().min(1, 'ID de producto es requerido'),
    productName: z.string(),
    productSlug: z.string(),
    productImage: z.string().url(),
    productSku: z.string().optional(),
    quantity: z.number().int().min(1, 'Cantidad mínima es 1'),
    price: z.number().min(0, 'Precio debe ser positivo'),
    discount: z.number().min(0).default(0),
});

export const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1, 'Debe haber al menos un item'),
    shippingAddressId: z.string().uuid('ID de dirección inválido'),
    billingAddressId: z.string().uuid().optional(),
    couponCode: z.string().optional(),
    notes: z.string().max(500).optional(),
});

