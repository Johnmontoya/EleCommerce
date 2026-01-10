import { Router } from "express";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository";
import { DeleteProductUseCase, GetBannerProductsUseCase, GetPromotionalProductsUseCase, GetTrendsProductUseCase } from "../application/use-cases/home/ShowcaseUseCases";
import { ShowcaseController } from "../presentation/controllers/HomeController";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware";

const router = Router();

const productRepository = new MongoProductRepository();

const getBannerProductsUseCase = new GetBannerProductsUseCase(productRepository);
const getPromotionalProductsUseCase = new GetPromotionalProductsUseCase(productRepository);
const getTrendsProductUseCase = new GetTrendsProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const showcaseController = new ShowcaseController(
    getBannerProductsUseCase,
    getPromotionalProductsUseCase,
    getTrendsProductUseCase,
    deleteProductUseCase
)

router.get('/showcase/banner', showcaseController.getBanner);
router.get('/showcase/promotional', showcaseController.getPromotional);
router.get('/showcase/trends', showcaseController.getTrending);
router.delete('/showcase/delete/:id', authenticate, authorize('ADMIN'), showcaseController.deleteProduct);

export default router;