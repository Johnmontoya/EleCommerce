import type { Request, Response } from 'express';
import type { CancelOrderUseCase, CreateOrderUseCase, GetAllOrdersByUserUseCase, GetOrdersUseCase } from "../../application/use-cases/orders/OrderUseCase";
import { CreateOrderSchema } from "../../infrastructure/validation/Order.schema";
import { handleError } from '../../infrastructure/middlewares/errorHandler';

export class OrderController {
    constructor(
        private createOrderUseCase: CreateOrderUseCase,
        private getAllOrdersUseCase: GetOrdersUseCase,
        private cancelOrderUseCase: CancelOrderUseCase,
        private getAllOrdersByUserUseCase: GetAllOrdersByUserUseCase
    ) { }

    createOrder = async (req: Request, res: Response) => {
        try {
            const validateData = CreateOrderSchema.parse(req.body);

            const order = await this.createOrderUseCase.execute(validateData, req.body.items);
            res.status(201).json({
                success: true,
                message: 'Orden creada exitosamente',
                data: order
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAllOrders = async (req: Request, res: Response) => {
        try {
            const orders = await this.getAllOrdersUseCase.execute();
            res.status(200).json({
                success: true,
                message: 'Ordenes obtenidas exitosamente',
                data: orders
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAllOrdersByUser = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para obtener sus ordenes'
                });
                return;
            }

            const orders = await this.getAllOrdersByUserUseCase.execute(userId);
            res.status(200).json({
                success: true,
                message: 'Ordenes obtenidas exitosamente',
                data: orders
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    cancelOrder = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;
            const orderId = req.params.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para eliminar su carrito'
                });
                return;
            }

            const order = await this.cancelOrderUseCase.execute(orderId!);
            res.status(200).json({
                success: true,
                message: 'Orden cancelada exitosamente',
                data: order
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}