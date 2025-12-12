import type { CreateProductDto } from "../../application/Dto/product.dto";
import { Product } from "../entities/Product";

export interface IProductrepository {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[] | null>;
  save(product: Product): Promise<void>;
  update(id: string, product: CreateProductDto): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

export interface Variant {
  name: string | null;
  options: string[];
}

export interface Attribute {
  name: string | null;
  value: string | null;
}

export interface Dimensions {
  weight: number;
  width: number;
  height: number;
  depth: number;
}

export interface Shipping {
  free: boolean;
  cost: number;
}
