import { apiClient } from "../../../shared/api/client";
import type { ApiResponse } from "../../products/types/product.types";
import { endpoints } from "../api/endpoints";
import type { CreateWishlistDTO, WishlistItem } from "../types/wish.types";

export const wishService = {
    getWishlistItems: async (): Promise<WishlistItem[] | null> => {
        const { data } = await apiClient.get(endpoints.wishlist.get);
        return data.data;
    },

    // POST - Agregar producto a la wishlist
    addToWishlist: async (data: CreateWishlistDTO): Promise<WishlistItem> => {
        const response = await apiClient.post(endpoints.wishlist.add, data);
        return response.data.data;
    },

    // DELETE - Eliminar item específico
    removeFromWishlist: async (itemId: string): Promise<void> => {
        const response = await apiClient.delete(endpoints.wishlist.delete(itemId));
        return response.data;
    },
    getWishCount: async (userId: string): Promise<ApiResponse<number>> => {
        const { data } = await apiClient.get(endpoints.wishlist.wishCount(userId));
        return data;
    },
}