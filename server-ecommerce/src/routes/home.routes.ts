import { Router } from "express";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository";
import { GetBannerProductsUseCase, GetPromotionalProductsUseCase, GetTrendsProductUseCase } from "../application/use-cases/home/ShowcaseUseCases";
import { ShowcaseController } from "../presentation/controllers/HomeController";

const router = Router();

const productRepository = new MongoProductRepository();

const getBannerProductsUseCase = new GetBannerProductsUseCase(productRepository);
const getPromotionalProductsUseCase = new GetPromotionalProductsUseCase(productRepository);
const getTrendsProductUseCase = new GetTrendsProductUseCase(productRepository)

const showcaseController = new ShowcaseController(
    getBannerProductsUseCase,
    getPromotionalProductsUseCase,
    getTrendsProductUseCase

)

router.get('/showcase/banner', showcaseController.getBanner);
router.get('/showcase/promotional', showcaseController.getPromotional);
router.get('/showcase/trends', showcaseController.getTrending);

export default router;