import { type Request, type Response } from "express";
import { CreateProductUseCase } from "../../application/use-cases/products/CreateProductUseCase";
import { MongoProductRepository } from "../../infrastructure/repositories/MongoProductRepository";
import { GetAllProductsUseCase } from "../../application/use-cases/products/GetAllProductsUseCase";
import { GetOneProductUseCase } from "../../application/use-cases/products/GetOneProductUseCase";
import { DeleteProductUseCase } from "../../application/use-cases/products/DeleteProductUseCase";
import { UpdateProductUseCase } from "../../application/use-cases/products/UpdateProductUseCase";
import { createProductSchema } from "../../infrastructure/validation/Product.schema";

const repo = new MongoProductRepository();

export class ProductController {
  static async createProduct(req: Request, res: Response) {
    try {
      const parsed = createProductSchema.safeParse(req.body);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const useCase = new CreateProductUseCase(repo);
      await useCase.execute(parsed.data);

      res.status(201).json({
        message: "Producto agregado",
      });
    } catch (e: any) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  static async getAllProduct(req: Request, res: Response) {
    try {
      const useCase = new GetAllProductsUseCase(repo);
      const result = await useCase.execute();

      if (result === null) {
        res.status(404).json({
          message: "No hay productos registrados",
        });
      }
      res.status(200).json(result)
    } catch (e: any) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  static async getIdProduct(req: Request, res: Response) {
    try {
      const useCase = new GetOneProductUseCase(repo);
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      const result = await useCase.execute(id);
      res.status(200).json(result);
    } catch (e: any) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const parsed = createProductSchema.safeParse(req.body);

      if (!id) {
        return res.status(404).json({
          message: "ID no valid",
        });
      }

      if (!parsed.success) {
        return res
          .status(400)
          .json({ errors: parsed.error.flatten().fieldErrors });
      }

      const useCase = new UpdateProductUseCase(repo);

      const ok = await useCase.execute(id, parsed.data);

      if (!ok) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        message: "Producto actualizado",
      });
    } catch (e: any) {
      res.status(400).json({
        error: e.message,
      });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const useCase = new DeleteProductUseCase(repo);
      const { id } = req.params;

      if (!id) {
        return res.status(404).json({
          message: "ID no valid",
        });
      }

      const ok = await useCase.execute(id);

      if (!ok) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        message: "Producto eliminado",
      });
    } catch (e: any) {
      res.status(400).json({
        error: e.message,
      });
    }
  }
}
