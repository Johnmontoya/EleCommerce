import type { CreateWishListInput, WishListItemResponse } from "../../application/Dto/wishlist.dto";

export interface IWishListRepository {
    createAndAddItem(userId: string, itemData: CreateWishListInput): Promise<boolean>;
    deleteItem(id: string): Promise<boolean>;
    getWishList(userId: string): Promise<WishListItemResponse[] | null>;
    getWishCount(userId: string): Promise<number>;
}