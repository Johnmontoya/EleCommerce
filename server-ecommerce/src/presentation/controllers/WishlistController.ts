import type { Request, Response } from "express";
import type { CreateWishListUseCase, DeleteWishListUseCase, GetWishCountUseCase, GetWishListUseCase } from "../../application/use-cases/wishlist/WishListUseCase.js";
import { handleError } from "../../infrastructure/middlewares/errorHandler.js";

export class WishlistController {
    constructor(
        private createWishListUseCase: CreateWishListUseCase,
        private deleteWishListUseCase: DeleteWishListUseCase,
        private getWishListUseCase: GetWishListUseCase,
        private getWishCountUseCase: GetWishCountUseCase
    ) { }

    createWishList = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para crear una lista de deseos'
                });
                return;
            }

            await this.createWishListUseCase.execute(userId, req.body);

            res.status(201).json({
                success: true,
                message: 'Producto agregado a la lista de deseos'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteWishList = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const wishListId = req.params.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para eliminar su lista de deseos'
                });
                return;
            }

            await this.deleteWishListUseCase.execute(wishListId!);

            res.status(200).json({
                success: true,
                message: 'Lista de deseos eliminada exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getWishList = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'Inicie sesión para ver su lista de deseos'
                });
                return;
            }

            const wishList = await this.getWishListUseCase.execute(userId);

            res.status(200).json({
                success: true,
                message: 'Lista de deseos obtenida exitosamente',
                data: wishList
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getWishCount = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            const wishList = await this.getWishCountUseCase.execute(userId!);

            res.status(200).json({ count: wishList });
        } catch (error) {
            handleError(error, res);
        }
    }
}