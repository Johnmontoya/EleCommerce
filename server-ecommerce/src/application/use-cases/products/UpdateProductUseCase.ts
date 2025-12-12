import { Product } from "../../../domain/entities/Product";
import type { IProductrepository } from "../../../domain/repositories/IProductRepository";
import type { CreateProductDto } from "../../Dto/product.dto";

export class UpdateProductUseCase {
  constructor(private readonly repo: IProductrepository) {}

  async execute(id: string, data: CreateProductDto) {    
    const product = await this.repo.update(id, data);
    return product;
  }
}