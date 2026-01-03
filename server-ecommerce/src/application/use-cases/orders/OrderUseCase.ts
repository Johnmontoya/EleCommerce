import type { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import type { CreateOrderInput, CreateOrderItem } from "../../Dto/order.dto";

export class CreateOrderUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(order: CreateOrderInput, items: CreateOrderItem[]) {
        const data = await this.orderRepository.createOrder(order, items);
        return data;
    }
}

export class GetOrdersUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute() {
        const data = await this.orderRepository.getAllOrders();
        return data;
    }
}

export class CancelOrderUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(orderId: string) {
        const data = await this.orderRepository.cancelOrder(orderId);
        return data;
    }
}

export class GetAllOrdersByUserUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(userId: string) {
        const data = await this.orderRepository.getAllOrdersByUser(userId);
        return data;
    }
}