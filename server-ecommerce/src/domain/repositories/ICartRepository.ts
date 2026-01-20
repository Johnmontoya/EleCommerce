import type { CartResponse, CreateCartInput } from "../../application/Dto/cart.dto.js";
import type { CartEntity } from "../entities/Cart.js";
import type { CartItemEntity } from "../entities/CartItem.js";

export interface ICartRepository {
    createCartAndAddFirstItem(userId: string, cartItemData: CreateCartInput): Promise<boolean>;
    getAllCarts(): Promise<CartEntity[]>;
    getCart(userId: string): Promise<CartEntity | null>;
    deleteCart(id: string): Promise<boolean>;
    updateCart(id: string, quantity: number): Promise<boolean>;
    getCartCount(userId: string): Promise<number>;
}

export interface ICartItemRepository {
    createCartItem(cartItem: CreateCartInput): Promise<CartItemEntity>;
    getAllCartItems(): Promise<CartItemEntity[]>;
}