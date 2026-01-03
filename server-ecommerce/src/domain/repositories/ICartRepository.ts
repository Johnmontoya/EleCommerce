import type { CartResponse, CreateCartInput } from "../../application/Dto/cart.dto";
import type { CartEntity } from "../entities/Cart";
import type { CartItemEntity } from "../entities/CartItem";

export interface ICartRepository {
    createCartAndAddFirstItem(userId: string, cartItemData: CreateCartInput): Promise<boolean>;
    getAllCarts(): Promise<CartEntity[]>;
    getCart(userId: string): Promise<CartEntity | null>;
    deleteCart(id: string): Promise<boolean>;
    updateCart(id: string, quantity: number): Promise<boolean>;
}

export interface ICartItemRepository {
    createCartItem(cartItem: CreateCartInput): Promise<CartItemEntity>;
    getAllCartItems(): Promise<CartItemEntity[]>;
}