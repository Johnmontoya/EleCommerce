import { Router } from "express";
import { ProductController } from "../presentation/controllers/ProductController";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, GetProductBySlugUseCase, SearchProductsAutoCompleteUseCase, GetProductsByCategoryUseCase, GetProductsByBrandUseCase, DeleteProductUseCase, DeleteManyProductsUseCase } from "../application/use-cases/products/ProductUseCase";
import { MongoProductRepository } from "../infrastructure/repositories/MongoProductRepository";

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

export default router;
