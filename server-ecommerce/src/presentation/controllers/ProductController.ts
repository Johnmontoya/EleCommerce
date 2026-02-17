import { type Request, type Response } from "express";
import { ImageProcessor } from "../../infrastructure/services/ImageProcess.js";
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
  DeleteManyProductsUseCase,
  GetBannersUseCase,
  UpdateBannerUseCase,
  DeleteBannerUseCase,
  GetShowcaseUseCase,
  AnalyzeTitleUseCase,
} from "../../application/use-cases/products/ProductUseCase.js";
import {
  CreateProductSchema,
} from "../../infrastructure/validation/Product.schema.js";
import { handleError } from "../../infrastructure/middlewares/errorHandler.js";
import clientImageKit from "../../config/imageKit.js";

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
    private deleteManyProductsUseCase: DeleteManyProductsUseCase,
    private searchProductsAutoCompleteUseCase: SearchProductsAutoCompleteUseCase,
    private getBannersUseCase: GetBannersUseCase,
    private updateBannerUseCase: UpdateBannerUseCase,
    private deleteBannerUseCase: DeleteBannerUseCase,
    private getShowcaseUseCase: GetShowcaseUseCase,
    private analyzeTitleUseCase: AnalyzeTitleUseCase
  ) { }

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;

      const name = data.name;
      const slug = data.slug;
      const description = data.description;
      const sku = data.sku;
      const category = data.category;

      // 2️⃣ Strings opcionales
      const barcode = data.barcode || "";
      const brand = data.brand || "";
      const digitalFile = data.digitalFile || "";

      // 3️⃣ Números (vienen como strings desde FormData)
      const price = Number(data.price);
      const priceDiscount = Number(data.priceDiscount);
      const stock = Number(data.stock);
      const rating = Number(data.rating);
      const reviewsCount = Number(data.reviewsCount);
      const soldCount = Number(data.soldCount);

      // 4️⃣ Booleanos (vienen como strings "true"/"false")
      const isDigital = data.isDigital === 'true';
      const isPublished = data.isPublished === 'true';

      // 5️⃣ Arrays (vienen como JSON strings)
      const tags = data.tags ? JSON.parse(data.tags) : [];
      const variants = data.variants ? JSON.parse(data.variants) : [];
      const attributes = data.attributes ? JSON.parse(data.attributes) : [];
      const relatedProducts = data.relatedProducts ? JSON.parse(data.relatedProducts) : [];

      // 6️⃣ Objetos (vienen como JSON strings)
      const dimensions = data.dimensions ? JSON.parse(data.dimensions) : {
        weight: 0,
        width: 0,
        height: 0,
        depth: 0
      };

      const shipping = data.shipping ? JSON.parse(data.shipping) : {
        free: false,
        cost: 0
      };

      const validatedData = CreateProductSchema.parse({
        name,
        slug,
        description,
        price,
        priceDiscount,
        stock,
        sku,
        barcode,
        brand,
        category,
        tags,
        rating,
        reviewsCount,
        variants,
        attributes,
        dimensions,
        shipping,
        isDigital,
        digitalFile,
        relatedProducts,
        soldCount,
        isPublished
      });

      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        res.status(400).json({
          success: false,
          message: "Debe subir al menos una imagen"
        });
        return;
      }

      const uploadPromises = files.map(async (file, index) => {
        const processedBuffer = await ImageProcessor.processImage(file.buffer, {
          width: 600,
          height: 600,
          quality: 85,
          fit: 'cover'
        });

        const webpFileName = `${Date.now()}-${index}-${file.originalname.replace(/\.[^/.]+$/, '')}.webp`;

        return clientImageKit.upload({
          file: processedBuffer,
          fileName: webpFileName,
          folder: "/EleCommerce/products"
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);

      const imagesData = uploadedImages.map((img, index) => {
        return {
          url: img.url,
          fileId: img.fileId
        };
      });

      const productData = {
        ...validatedData,
        images: imagesData,
      };

      const product = await this.createProductUseCase.execute(productData);

      res.status(201).json({
        success: true,
        message: "Producto creado exitosamente",
        data: product
      });
    } catch (error: any) {
      handleError(error, res);
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;

      const name = data.name;
      const slug = data.slug;
      const description = data.description;
      const sku = data.sku;
      const category = data.category;

      const barcode = data.barcode || "";
      const brand = data.brand || "";
      const digitalFile = data.digitalFile || "";

      const price = Number(data.price);
      const priceDiscount = Number(data.priceDiscount);
      const stock = Number(data.stock);
      const rating = Number(data.rating);
      const reviewsCount = Number(data.reviewsCount);
      const soldCount = Number(data.soldCount);

      const isDigital = Boolean(data.isDigital);
      const isPublished = Boolean(data.isPublished);

      const tags = data.tags ? JSON.parse(data.tags) : [];
      const variants = data.variants ? JSON.parse(data.variants) : [];
      const attributes = data.attributes ? JSON.parse(data.attributes) : [];
      const relatedProducts = data.relatedProducts ? JSON.parse(data.relatedProducts) : [];

      const dimensions = data.dimensions ? JSON.parse(data.dimensions) : {
        weight: 0,
        width: 0,
        height: 0,
        depth: 0
      };

      const shipping = data.shipping ? JSON.parse(data.shipping) : {
        free: false,
        cost: 0
      };

      const currentProduct = await this.getProductByIdUseCase.execute(id!);

      if (!currentProduct) {
        res.status(404).json({
          success: false,
          message: "Producto no encontrado"
        });
        return;
      }

      let currentImages = currentProduct.images || [];

      // ============================================
      if (data.imagesToDelete) {
        const imagesToDelete = JSON.parse(data.imagesToDelete) as string[];

        if (imagesToDelete.length > 0) {
          try {
            await clientImageKit.bulkDeleteFiles(imagesToDelete);

            currentImages = currentImages.filter(
              img => !imagesToDelete.includes(img.fileId)
            );
          } catch (error) {
            console.error("Error al eliminar imágenes de ImageKit:", error);
          }
        }
      }

      const files = req.files as Express.Multer.File[];
      let newImagesData: Array<{ url: string; fileId: string; }> = [];

      if (files && files.length > 0) {
        const uploadPromises = files.map(async (file, index) => {
          const processedBuffer = await ImageProcessor.processImage(file.buffer, {
            width: 600,
            height: 600,
            quality: 85,
            fit: 'cover'
          });

          const webpFileName = `${Date.now()}-${index}-${file.originalname.replace(/\.[^/.]+$/, '')}.webp`;

          return clientImageKit.upload({
            file: processedBuffer,
            fileName: webpFileName,
            folder: "/EleCommerce/products"
          });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        newImagesData = uploadedImages.map(img => ({
          url: img.url,
          fileId: img.fileId
        }));
      }

      const allImages = [...currentImages, ...newImagesData];

      if (allImages.length === 0) {
        res.status(400).json({
          success: false,
          message: "El producto debe tener al menos una imagen"
        });
        return;
      }

      const updatedProductData = {
        name,
        slug,
        description,
        price,
        priceDiscount,
        stock,
        sku,
        barcode,
        brand,
        category,
        tags,
        rating,
        reviewsCount,
        variants,
        attributes,
        dimensions,
        shipping,
        isDigital,
        digitalFile,
        relatedProducts,
        soldCount,
        isPublished,
        images: allImages
      };

      const product = await this.updateProductUseCase.execute(
        id!,
        updatedProductData
      );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Error al actualizar el producto"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Producto actualizado exitosamente",
        data: product
      });

    } catch (error: any) {
      handleError(error, res);
    }
  };

  updatePublish = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;

      const isPublished = data.isPublished;

      const product = await this.updateProductUseCase.execute(
        id!,
        { isPublished }
      );

      if (!product) {
        res.status(404).json({
          success: false,
          message: "Error al actualizar el producto"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Producto actualizado exitosamente",
        data: product
      });

    } catch (error: any) {
      handleError(error, res);
    }
  };

  deleteProductImages = async (imageIds: string[]): Promise<void> => {
    for (const imageId of imageIds) {
      try {
        await clientImageKit.deleteFile(imageId);
      } catch (error) {
        console.error(`Error al eliminar imagen ${imageId} de ImageKit:`, error);
      }
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const filters: any = {};

      if (req.query.category) {
        filters.category = req.query.category as string;
      }

      if (req.query.brands) {
        const brandsParam = req.query.brands as string;
        filters.brands = brandsParam.split(',').map(b => b.trim());
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

      if (req.query.isPublished !== undefined && req.query.isPublished !== null) {
        filters.isPublished = req.query.isPublished === 'true';
      }

      const products = await this.getAllProductsUseCase.execute(
        Object.keys(filters).length > 0 ? filters : undefined
      );

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

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      console.log("=== ELIMINANDO PRODUCTO ===");
      console.log("ID:", id);

      const product = await this.getProductByIdUseCase.execute(id!);

      const fileIds = product?.images.map(img => img.fileId);

      if (fileIds!.length > 0) {
        console.log(`Eliminando ${fileIds!.length} imágenes de ImageKit...`);
        try {
          await clientImageKit.bulkDeleteFiles(fileIds!);
          console.log("✓ Imágenes eliminadas de ImageKit");
        } catch (error) {
          console.error("Error al eliminar imágenes de ImageKit:", error);
        }
      }

      const deletedProduct = await this.deleteProductUseCase.execute(id!);

      console.log("=== PRODUCTO ELIMINADO EXITOSAMENTE ===");

      res.status(200).json({
        success: true,
        message: "Producto eliminado exitosamente",
        data: deletedProduct
      });
    } catch (error: any) {
      console.error("=== ERROR AL ELIMINAR PRODUCTO ===");
      console.error("Error:", error);

      res.status(400).json({
        success: false,
        message: error.message || "Error al eliminar el producto"
      });
    }
  };


  deleteMany = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ids } = req.body;

      if (!ids) {
        res.status(400).json({
          success: false,
          message: "IDs son requeridos",
        });
      }

      const product = await this.deleteManyProductsUseCase.execute(ids);

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

  getAllBanners = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.getBannersUseCase.execute();

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

  updateBanner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await this.updateBannerUseCase.execute(id!, req.body);

      res.status(201).json({
        success: true,
        data: product,
        message: "Banner actualizado correctamente",
      });
    } catch (error: any) {
      handleError(error, res);
    }
  };

  getShowcase = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.getShowcaseUseCase.execute();

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

  analyzeTitle = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title } = req.body;
      const product = await this.analyzeTitleUseCase.execute(title);

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