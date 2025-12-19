import { Router } from "express";
import { CategoryController } from "../presentation/controllers/CategoryController";
import { CreateCategoryUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase, GetAllCategoriesUseCase, GetCategoryByIdUseCase, GetCategoryBySlugUseCase } from "../application/use-cases/category/CategoryUseCase";
import { MongoCategoryRepository } from "../infrastructure/repositories/MongoCategoryRepository";

const router = Router();

const categoryRepository = new MongoCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const getCategoryBySlugUseCase = new GetCategoryBySlugUseCase(categoryRepository);

const categoryController = new CategoryController(
    createCategoryUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase,
    getCategoryByIdUseCase,
    getAllCategoriesUseCase,
    getCategoryBySlugUseCase
);

router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.get("/categories/slug/:slug", categoryController.getCategoryBySlug);
router.delete("/categories/:id", categoryController.deleteCategory);

export default router;
