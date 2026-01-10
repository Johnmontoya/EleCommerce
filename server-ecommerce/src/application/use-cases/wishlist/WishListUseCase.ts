import type { IWishListRepository } from "../../../domain/repositories/IWishListRepository";
import type { CreateWishListInput } from "../../Dto/wishlist.dto";

export class CreateWishListUseCase {
    constructor(private wishListRepository: IWishListRepository) { }

    async execute(userId: string, itemData: CreateWishListInput) {
        const data = await this.wishListRepository.createAndAddItem(userId, itemData);
        return data;
    }
}

export class DeleteWishListUseCase {
    constructor(private wishListRepository: IWishListRepository) { }

    async execute(id: string) {
        const data = await this.wishListRepository.deleteItem(id);
        return data;
    }
}

export class GetWishListUseCase {
    constructor(private wishListRepository: IWishListRepository) { }

    async execute(userId: string) {
        const data = await this.wishListRepository.getWishList(userId);
        return data;
    }
}

export class GetWishCountUseCase {
    constructor(private wishListRepository: IWishListRepository) { }

    async execute(userId: string) {
        const data = await this.wishListRepository.getWishCount(userId);
        return data;
    }
}