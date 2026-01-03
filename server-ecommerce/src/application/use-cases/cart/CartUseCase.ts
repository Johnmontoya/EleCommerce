import type { ICartRepository } from "../../../domain/repositories/ICartRepository";
import type { CreateCartInput } from "../../Dto/cart.dto";

export class CreateCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    async execute(userId: string, cartItemData: CreateCartInput) {
        const data = await this.cartRepository.createCartAndAddFirstItem(userId, cartItemData);
        return data;
    }
}

export class GetCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    async execute(userId: string) {
        const data = await this.cartRepository.getCart(userId);
        return data;
    }
}

export class DeleteCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    async execute(cartId: string) {
        const data = await this.cartRepository.deleteCart(cartId);
        return data;
    }
}

export class UpdateCartUseCase {
    constructor(private cartRepository: ICartRepository) { }

    async execute(cartId: string, cartItemData: CreateCartInput) {
        const data = await this.cartRepository.updateCart(cartId, cartItemData.quantity);
        return data;
    }
}
