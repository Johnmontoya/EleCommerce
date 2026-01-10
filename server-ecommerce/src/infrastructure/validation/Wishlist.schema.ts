import { z } from "zod";

export const wishlistItemSchema = z.object({
    wishListId: z.string(),
    productName: z.string(),
    productImage: z.string(),
    productId: z.string(),
    category: z.string(),
    rating: z.number(),
    reviews: z.number(),
    stock: z.number(),
    price: z.number(),
    discount: z.number(),
    createdAt: z.date(),
})