import type { ICartItemRepository } from "../../../domain/repositories/ICartRepository";
import type { CreateCartInput } from "../../Dto/cart.dto";

export class CreateCartItemUseCase {
    constructor(private cartRepository: ICartItemRepository) { }

    async execute(cartItem: CreateCartInput) {
        const data = await this.cartRepository.createCartItem(cartItem);
        return data;
    }
}