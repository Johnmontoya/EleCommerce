import { Router } from "express";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware";
import { PrismaOrderRepository } from "../infrastructure/repositories/PrismaOrderRepository";
import { CancelOrderUseCase, CreateOrderUseCase, GetOrdersUseCase, GetAllOrdersByUserUseCase } from "../application/use-cases/orders/OrderUseCase";
import { OrderController } from "../presentation/controllers/OrderController";

const router = Router();
const orderRepository = new PrismaOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetOrdersUseCase(orderRepository);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);
const getAllOrdersByUserUseCase = new GetAllOrdersByUserUseCase(orderRepository);

const orderController = new OrderController(
    createOrderUseCase,
    getAllOrdersUseCase,
    cancelOrderUseCase,
    getAllOrdersByUserUseCase
);

router.post('/create', authenticate, orderController.createOrder);
router.get('/all', authenticate, orderController.getAllOrders);
router.get('/orders-user', authenticate, orderController.getAllOrdersByUser);
router.delete('/cancel/:id', authenticate, orderController.cancelOrder);

export default router;
