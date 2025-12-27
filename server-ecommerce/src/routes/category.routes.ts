import { Router } from "express";
import { CategoryController } from "../presentation/controllers/CategoryController";
import { CreateCategoryUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase, GetAllCategoriesUseCase, GetCategoryByIdUseCase, GetCategoryBySlugUseCase, DeleteManyCategoriesUseCase } from "../application/use-cases/category/CategoryUseCase";
import { MongoCategoryRepository } from "../infrastructure/repositories/MongoCategoryRepository";

const router = Router();

const categoryRepository = new MongoCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
const getCategoryBySlugUseCase = new GetCategoryBySlugUseCase(categoryRepository);
const deleteManyCategoriesUseCase = new DeleteManyCategoriesUseCase(categoryRepository);

const categoryController = new CategoryController(
    createCategoryUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase,
    getCategoryByIdUseCase,
    getAllCategoriesUseCase,
    getCategoryBySlugUseCase,
    deleteManyCategoriesUseCase
);

router.post("/categories", categoryController.createCategory);
router.put("/categories/:id", categoryController.updateCategory);
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.get("/categories/slug/:slug", categoryController.getCategoryBySlug);
router.delete("/categories/:id", categoryController.deleteCategory);
router.delete("/categories", categoryController.deleteManyCategories);

export default router;
