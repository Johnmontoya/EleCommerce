import { type Request, type Response } from "express";
import type { DeleteProductUseCase, GetBannerProductsUseCase, GetPromotionalProductsUseCase, GetTrendsProductUseCase } from "../../application/use-cases/home/ShowcaseUseCases";
import { handleError } from "../../infrastructure/middlewares/errorHandler";

export class ShowcaseController {
    constructor(
        private getBannerProductsUseCase: GetBannerProductsUseCase,
        private getPromotionalProductsUseCase: GetPromotionalProductsUseCase,
        private getTrendsProductUseCase: GetTrendsProductUseCase,
        private deleteProductUseCase: DeleteProductUseCase
    ) { }

    getBanner = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.getBannerProductsUseCase.execute();
            res.status(200).json({
                success: true,
                data: products,
                count: products.length,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getPromotional = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.getPromotionalProductsUseCase.execute();
            res.status(200).json({
                success: true,
                data: products,
                count: products.length,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getTrending = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.getTrendsProductUseCase.execute();
            res.status(200).json({
                success: true,
                data: products,
                count: products.length,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.deleteProductUseCase.execute(id!);
            res.status(200).json({
                success: true,
                message: "Banner eliminado correctamente",
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}