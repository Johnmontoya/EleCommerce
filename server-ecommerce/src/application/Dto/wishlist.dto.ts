import type z from "zod";
import type { wishlistItemSchema } from "../../infrastructure/validation/Wishlist.schema";

export type CreateWishListInput = z.infer<typeof wishlistItemSchema>;

export interface WishListItemResponse {
    id: string;
    wishlistId: string;
    productId: string;
    productName: string;
    productImage: string;
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    price: number;
    discount: number;
    total: number;
    createdAt: Date;
}