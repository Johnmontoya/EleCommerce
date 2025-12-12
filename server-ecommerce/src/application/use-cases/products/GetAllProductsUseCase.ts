import type { IProductrepository } from "../../../domain/repositories/IProductRepository";

export class GetAllProductsUseCase {
  constructor(private readonly repo: IProductrepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
