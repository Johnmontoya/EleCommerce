import type { UsersFilters } from "../../../domain/repositories/IAuthRepository";
import type { IOrderRepository, OrderStatus } from "../../../domain/repositories/IOrderRepository";
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

    async execute(filters?: UsersFilters) {
        const data = await this.orderRepository.getAllOrders(filters);
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

    async execute(userId: string, filters?: UsersFilters) {
        const data = await this.orderRepository.getAllOrdersByUser(userId, filters);
        return data;
    }
}

export class UpdateOrderStatusUseCase {
    constructor(private orderRepository: IOrderRepository) { }

    async execute(orderId: string, status: OrderStatus) {
        const data = await this.orderRepository.updateOrderStatus(orderId, status);
        return data;
    }
}
