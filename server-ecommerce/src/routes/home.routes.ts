import { Router } from "express";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository";
import { GetBannerProductsUseCase } from "../application/use-cases/home/ShowcaseUseCases";
import { ShowcaseController } from "../presentation/controllers/HomeController";

const router = Router();

const productRepository = new MongoProductRepository();

const getBannerProductsUseCase = new GetBannerProductsUseCase(productRepository);

const showcaseController = new ShowcaseController(
    getBannerProductsUseCase
)

router.get('/showcase/banner', showcaseController.getBanner);

export default router;