import type { ICartItemRepository } from "../../../domain/repositories/ICartRepository.js";
import type { CreateCartInput } from "../../Dto/cart.dto.js";

export class CreateCartItemUseCase {
    constructor(private cartRepository: ICartItemRepository) { }

    async execute(cartItem: CreateCartInput) {
        const data = await this.cartRepository.createCartItem(cartItem);
        return data;
    }
}