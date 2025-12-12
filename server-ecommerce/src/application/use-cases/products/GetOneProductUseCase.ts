import type { IProductrepository } from "../../../domain/repositories/IProductRepository";

export class GetOneProductUseCase {
  constructor(private readonly repo: IProductrepository) {}

  async execute(id: string) {
    return this.repo.findById(id);
  }
}