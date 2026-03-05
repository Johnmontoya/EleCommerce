import { Router } from "express";
import { ProductController } from "../presentation/controllers/ProductController.js";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, GetProductBySlugUseCase, SearchProductsAutoCompleteUseCase, GetProductsByCategoryUseCase, GetProductsByBrandUseCase, DeleteProductUseCase, DeleteManyProductsUseCase, GetBannersUseCase, UpdateBannerUseCase, DeleteBannerUseCase, GetShowcaseUseCase, AnalyzeTitleUseCase } from "../application/use-cases/products/ProductUseCase.js";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository.js";
import { upload } from "../infrastructure/middlewares/multerMiddleware.js";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware.js";

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
const analyzeTitleUseCase = new AnalyzeTitleUseCase(productRepository);

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
    getShowcaseUseCase,
    analyzeTitleUseCase
)

// Add a quick middleware to validate search query length to prevent DoS
const validateSearchQuery = (req: any, res: any, next: any) => {
    if (req.query.q && typeof req.query.q === 'string' && req.query.q.length > 200) {
        return res.status(400).json({ success: false, message: 'Search query is too long' });
    }
    next();
};

router.post('/products', authenticate, authorize('ADMIN'), upload.array('images', 5), productController.createProduct);
router.get('/products', productController.getAll);
router.get('/products/search', validateSearchQuery, productController.searchAutoComplete); // ⚠️ Debe ir ANTES de /:id
router.get('/products/slug/:slug', productController.getBySlug);
router.get('/products/category/:category', productController.getByCategory);
router.get('/products/brand/:brand', productController.getByBrand);
router.get('/products/:id', productController.getIdProduct);
router.put('/products/:id', authenticate, authorize('ADMIN'), upload.array('images', 5), productController.updateProduct);
router.put('/products/:id/publish', authenticate, authorize('ADMIN'), productController.updatePublish);
router.delete('/products/:id', authenticate, authorize('ADMIN'), productController.deleteProduct);
router.delete('/products', authenticate, authorize('ADMIN'), productController.deleteMany);
router.get('/banners', productController.getAllBanners);
router.put('/banners/:id', authenticate, authorize('ADMIN'), productController.updateBanner);
/*router.put('/banners/:id', productController.updateBanner);
router.delete('/banners/:id', productController.deleteBanner);*/
router.get('/showcase', productController.getShowcase);
router.post('/products/analyze-title', authenticate, authorize('ADMIN'), productController.analyzeTitle);

export default router;

