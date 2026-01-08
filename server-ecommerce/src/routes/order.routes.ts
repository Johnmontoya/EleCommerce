import { Router } from "express";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware";
import { PrismaOrderRepository } from "../infrastructure/repositories/PrismaOrderRepository";
import { CancelOrderUseCase, CreateOrderUseCase, GetOrdersUseCase, GetAllOrdersByUserUseCase, UpdateOrderStatusUseCase } from "../application/use-cases/orders/OrderUseCase";
import { OrderController } from "../presentation/controllers/OrderController";

const router = Router();
const orderRepository = new PrismaOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetOrdersUseCase(orderRepository);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);
const getAllOrdersByUserUseCase = new GetAllOrdersByUserUseCase(orderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);

const orderController = new OrderController(
    createOrderUseCase,
    getAllOrdersUseCase,
    cancelOrderUseCase,
    getAllOrdersByUserUseCase,
    updateOrderStatusUseCase
);

router.post('/create', authenticate, orderController.createOrder);
router.get('/all', authenticate, authorize('ADMIN'), orderController.getAllOrders);
router.get('/orders-user', authenticate, orderController.getAllOrdersByUser);
router.delete('/cancel/:id', authenticate, orderController.cancelOrder);
router.put('/update-status/:id', authenticate, authorize('ADMIN'), orderController.updateOrderStatus);

export default router;
