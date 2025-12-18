import { type Request, type Response } from "express";
import type {
  CreateProductUseCase,
  GetProductByIdUseCase,
  GetAllProductsUseCase,
  UpdateProductUseCase,
  GetProductBySlugUseCase,
  SearchProductsAutoCompleteUseCase,
  GetProductsByCategoryUseCase,
  GetProductsByBrandUseCase,
  DeleteProductUseCase,
} from "../../application/use-cases/products/ProductUseCase";
import {
  CreateProductSchema,
  UpdateProductSchema,
} from "../../infrastructure/validation/Product.schema";
import { ZodError } from "zod";
import { handleError } from "../../infrastructure/middlewares/errorHandler";

export interface IAutoCompleteSearch {
  terms?: string;
  limit?: number;
}

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private getAllProductsUseCase: GetAllProductsUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getProductBySlugUseCase: GetProductBySlugUseCase,
    private getProductByCategoryUseCase: GetProductsByCategoryUseCase,
    private getProductByBrandUseCase: GetProductsByBrandUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private searchProductsAutoCompleteUseCase: SearchProductsAutoCompleteUseCase
  ) { }

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = CreateProductSchema.parse(req.body);
      const product = await this.createProductUseCase.execute(validatedData);

      res.status(201).json({
        success: true,
        data: product,
        message: "Producto creado correctamente",
      });
    } catch (error: any) {
      handleError(error, res);
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const validatedData = UpdateProductSchema.parse(req.body);

      const product = await this.updateProductUseCase.execute(
        id!,
        validatedData
      );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
        message: "Producto actualizado correctamente",
      });
    } catch (error) {
      console.log(error);
      handleError(error, res);
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('📥 Raw query params:', req.query);

      const filters: any = {};

      if (req.query.category) {
        filters.category = req.query.category as string;
      }

      // ✅ CRÍTICO: Parsear brands correctamente
      if (req.query.brands) {
        const brandsParam = req.query.brands as string;
        console.log('🔍 Raw brands param:', brandsParam);

        // Convertir "SmartFit,MasterCourses" a ['SmartFit', 'MasterCourses']
        filters.brands = brandsParam.split(',').map(b => b.trim());

        console.log('✅ Parsed brands array:', filters.brands);
      }

      if (req.query.minPrice) {
        filters.minPrice = Number(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        filters.maxPrice = Number(req.query.maxPrice);
      }

      if (req.query.search) {
        filters.search = req.query.search as string;
      }

      if (req.query.limit) {
        filters.limit = Number(req.query.limit);
      }

      if (req.query.offset) {
        filters.offset = Number(req.query.offset);
      }

      // Solo agregar isPublished si está presente
      if (req.query.isPublished !== undefined && req.query.isPublished !== null) {
        filters.isPublished = req.query.isPublished === 'true';
      }

      console.log('🎯 Final filters sent to use case:', JSON.stringify(filters, null, 2));

      const products = await this.getAllProductsUseCase.execute(
        Object.keys(filters).length > 0 ? filters : undefined
      );

      console.log('📊 Products returned:', products.length);

      res.status(200).json({
        success: true,
        data: products,
        count: products.length,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  getIdProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "ID es requerido",
        });
      }

      const product = await this.getProductByIdUseCase.execute(id!);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  getBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
      const { slug } = req.params;

      if (!slug) {
        res.status(404).json({
          success: false,
          message: "Slug es requerido",
        });
        return;
      }

      const product = await this.getProductBySlugUseCase.execute(slug!);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  getByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;

      if (!category) {
        res.status(404).json({
          success: false,
          message: "Categoria es requerida",
        });
        return;
      }

      const product = await this.getProductByCategoryUseCase.execute(category!);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
        count: product.length,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  getByBrand = async (req: Request, res: Response): Promise<void> => {
    try {
      const { brand } = req.params;

      if (!brand) {
        res.status(404).json({
          success: false,
          message: "Marca es requerida",
        });
        return;
      }

      const product = await this.getProductByBrandUseCase.execute(brand!);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
        count: product.length,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "ID es requerido",
        });
      }

      const product = await this.deleteProductUseCase.execute(id!);

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  };

  searchAutoComplete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { search } = req.query;
      const product = await this.searchProductsAutoCompleteUseCase.execute(search as string)

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      handleError(error, res);
    }
  };
}
