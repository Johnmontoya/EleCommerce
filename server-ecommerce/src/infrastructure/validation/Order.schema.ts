import z from "zod";

export const DisplaySectionEnum = z.enum([
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED',
    'REFUNDED'
]);

export const DisplayPaymentStatus = z.enum([
    "PENDING",
    "REFUNDED",
    "PAID",
    "FAILED"
])

export const OrderItemSchema = z.object({
    cartId: z.string().min(1, 'ID de orden es requerido'),
    name: z.string(),
    image: z.string().url(),
    productId: z.string().min(1, 'ID de producto es requerido'),
    quantity: z.number().int().min(1, 'Cantidad mínima es 1'),
    price: z.number().min(0, 'Precio debe ser positivo'),
    discount: z.number().min(0).default(0),
    total: z.number().min(0, 'Total debe ser positivo'),
});

export const OrderFiltersSchema = z.object({
    search: z.string().optional(),
    limit: z.string().optional(),
    offset: z.string().optional(),
    status: DisplaySectionEnum.optional()
})

export const CreateOrderSchema = z.object({
    userId: z.string().min(1, 'ID de usuario es requerido'),
    subtotal: z.number().min(0, 'Subtotal debe ser positivo'),
    tax: z.number().min(0, 'Impuesto debe ser positivo'),
    shippingCost: z.number().min(0, 'Costo de envío debe ser positivo'),
    discount: z.number().min(0, 'Descuento debe ser positivo'),
    total: z.number().min(0, 'Total debe ser positivo'),
    status: DisplaySectionEnum.default('PENDING'),
    paymentStatus: DisplayPaymentStatus.default('PENDING'),
    paymentMethod: z.string().min(1, 'Ingresa un Método de pago'),
    addressId: z.string().min(1, 'Agrega una direccion de envio'),
    trackingNumber: z.string().min(1, 'Número de seguimiento es requerido'),
    notes: z.string().min(1, 'Notas es requerida').nullable()
});

