import type { Request, Response } from "express";
import type { CreateCartUseCase, GetCartUseCase, DeleteCartUseCase, UpdateCartUseCase } from "../../application/use-cases/cart/CartUseCase";
import { handleError } from "../../infrastructure/middlewares/errorHandler";

export class CartController {
    constructor(private createCartUseCase: CreateCartUseCase,
        private getCartUseCase: GetCartUseCase,
        private deleteCartUseCase: DeleteCartUseCase,
        private updateCartUseCase: UpdateCartUseCase) { }

    createCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para crear un carrito'
                });
                return;
            }

            await this.createCartUseCase.execute(userId, req.body);

            res.status(200).json({
                success: true,
                message: 'Producto agregado al carrito'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para ver su carrito'
                });
                return;
            }

            const cart = await this.getCartUseCase.execute(userId);

            res.status(200).json({
                success: true,
                message: 'Carrito obtenido exitosamente',
                data: cart
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const cartId = req.params.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para eliminar su carrito'
                });
                return;
            }

            await this.deleteCartUseCase.execute(cartId!);

            res.status(200).json({
                success: true,
                message: 'Carrito eliminado exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updateCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const cartId = req.body.id;
            const quantity = req.body.quantity;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para actualizar su carrito'
                });
                return;
            }

            await this.updateCartUseCase.execute(cartId!, quantity);

            res.status(200).json({
                success: true,
                message: 'Producto actualizado'
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}