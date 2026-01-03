import { z } from "zod";

export const cartItemSchema = z.object({
    cartId: z.string(),
    name: z.string(),
    image: z.string(),
    productId: z.string(),
    quantity: z.number(),
    price: z.number(),
    discount: z.number(),
    stock: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const cartSchema = z.object({
    id: z.string(),
    userId: z.string(),
    sessionId: z.string(),
    items: z.array(cartItemSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
})

