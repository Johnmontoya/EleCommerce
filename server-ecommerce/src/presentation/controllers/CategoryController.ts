import { type Request, type Response } from "express";
import type { CreateCategoryUseCase, DeleteCategoryUseCase, DeleteManyCategoriesUseCase, GetAllCategoriesUseCase, GetCategoryByIdUseCase, GetCategoryBySlugUseCase, UpdateCategoryUseCase } from "../../application/use-cases/category/CategoryUseCase";
import { CreateCategorySchema, UpdateCategorySchema } from "../../infrastructure/validation/Category.schema";
import { handleError } from "../../infrastructure/middlewares/errorHandler";

export class CategoryController {
    constructor(
        private createCategoryUseCase: CreateCategoryUseCase,
        private updateCategoryUseCase: UpdateCategoryUseCase,
        private deleteCategoryUseCase: DeleteCategoryUseCase,
        private findCategoryUseCase: GetCategoryByIdUseCase,
        private findAllCategoriesUseCase: GetAllCategoriesUseCase,
        private findBySlugCategoryUseCase: GetCategoryBySlugUseCase,
        private deleteManyCategoriesUseCase: DeleteManyCategoriesUseCase
    ) { }

    createCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const validateData = CreateCategorySchema.parse(req.body);
            const category = await this.createCategoryUseCase.execute(validateData);
            res.status(201).json({
                success: true,
                data: category,
                message: "Categoria creada correctamente"
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updateCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const validateData = UpdateCategorySchema.parse(req.body);
            const category = await this.updateCategoryUseCase.execute(id!, validateData);
            res.status(200).json({
                success: true,
                data: category,
                message: "Categoria actualizada correctamente"
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAllCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await this.findAllCategoriesUseCase.execute();

            if (categories.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "No se encontraron categorias"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: categories,
                count: categories.length,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getCategoryById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const category = await this.findCategoryUseCase.execute(id!);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Categoria no encontrada"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
        try {
            const { slug } = req.params;
            const category = await this.findBySlugCategoryUseCase.execute(slug!);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Categoria no encontrada"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteCategory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const category = await this.deleteCategoryUseCase.execute(id!);

            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Categoria no encontrada"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: category,
                message: "Categoria eliminada correctamente"
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteManyCategories = async (req: Request, res: Response): Promise<void> => {
        try {
            const { ids } = req.body;
            console.log(ids);
            const categories = await this.deleteManyCategoriesUseCase.execute(ids);

            if (!categories) {
                res.status(404).json({
                    success: false,
                    message: "Categorias no encontradas"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: categories,
                message: "Categorias eliminadas correctamente"
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}