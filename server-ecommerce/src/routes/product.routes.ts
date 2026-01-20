import { Router } from "express";
import { ProductController } from "../presentation/controllers/ProductController.js";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, GetProductBySlugUseCase, SearchProductsAutoCompleteUseCase, GetProductsByCategoryUseCase, GetProductsByBrandUseCase, DeleteProductUseCase, DeleteManyProductsUseCase, GetBannersUseCase, UpdateBannerUseCase, DeleteBannerUseCase, GetShowcaseUseCase } from "../application/use-cases/products/ProductUseCase.js";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository.js";

const router = Router();

const productRepository = new MongoProductRepository();

const createProductUseCase = new CreateProductUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getProductBySlugUseCase = new GetProductBySlugUseCase(productRepository);
const searchProductsAutoCompleteUseCase = new SearchProductsAutoCompleteUseCase(productRepository);
const getProductByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);
const getProductByBrandUseCase = new GetProductsByBrandUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteManyProductsUseCase = new DeleteManyProductsUseCase(productRepository);
const getBannersUseCase = new GetBannersUseCase(productRepository);
const updateBannerUseCase = new UpdateBannerUseCase(productRepository);
const deleteBannerUseCase = new DeleteBannerUseCase(productRepository);
const getShowcaseUseCase = new GetShowcaseUseCase(productRepository);

const productController = new ProductController(
    createProductUseCase,
    updateProductUseCase,
    getAllProductsUseCase,
    getProductByIdUseCase,
    getProductBySlugUseCase,
    getProductByCategoryUseCase,
    getProductByBrandUseCase,
    deleteProductUseCase,
    deleteManyProductsUseCase,
    searchProductsAutoCompleteUseCase,
    getBannersUseCase,
    updateBannerUseCase,
    deleteBannerUseCase,
    getShowcaseUseCase
)

router.post('/products', productController.createProduct);
router.get('/products', productController.getAll);
router.get('/products/search', productController.searchAutoComplete); // ⚠️ Debe ir ANTES de /:id
router.get('/products/slug/:slug', productController.getBySlug);
router.get('/products/category/:category', productController.getByCategory);
router.get('/products/brand/:brand', productController.getByBrand);
router.get('/products/:id', productController.getIdProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.delete);
router.delete('/products', productController.deleteMany);
router.get('/banners', productController.getAllBanners);
router.put('/banners/:id', productController.updateBanner);
/*router.put('/banners/:id', productController.updateBanner);
router.delete('/banners/:id', productController.deleteBanner);*/
router.get('/showcase', productController.getShowcase);

export default router;
