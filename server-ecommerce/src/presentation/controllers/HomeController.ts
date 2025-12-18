import { type Request, type Response } from "express";
import type { GetBannerProductsUseCase } from "../../application/use-cases/home/ShowcaseUseCases";
import { handleError } from "../../infrastructure/middlewares/errorHandler";

export class ShowcaseController {
    constructor(
        private getBannerProductsUseCase: GetBannerProductsUseCase,
    ) { }

    getBanner = async (req: Request, res: Response): Promise<void> => {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 3;
            const products = await this.getBannerProductsUseCase.execute(limit);
            res.status(200).json({
                success: true,
                data: products,
                count: products.length,
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}