import { apiClient } from "../../../shared/api/client";
import type { Address } from "../../profile/types/profile.types";
import { endpoints } from "../api/endpoints";
import type { CartResponse, CreateCartInput } from "../types/cart.types";

export const cartService = {
    createCart: async (cart: CreateCartInput): Promise<string> => {
        const { data } = await apiClient.post(endpoints.cart.addToCart, cart);
        return data;
    },
    getCart: async (): Promise<CartResponse | null> => {
        const { data } = await apiClient.get(endpoints.cart.getCart);
        return data.data;
    },
    deleteCart: async (id: string): Promise<string> => {
        const { data } = await apiClient.delete(endpoints.cart.deleteCart(id));
        return data;
    },
    createOrder: async (order: CreateCartInput): Promise<string> => {
        const { data } = await apiClient.post(endpoints.cart.createOrder, order);
        return data;
    },
    updateCart: async (id: string, quantity: number): Promise<string> => {
        const { data } = await apiClient.put(endpoints.cart.updateCart, { id, quantity });
        return data;
    },
    getAddressByUserId: async (): Promise<Address[] | null> => {
        const { data } = await apiClient.get(endpoints.address.getAddressByUserId);
        return data.data;
    }
}