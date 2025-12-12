import type { IProductrepository } from "../../../domain/repositories/IProductRepository";

export class DeleteProductUseCase {
  constructor(private repository: IProductrepository) {}

  execute(id: string) {
    return this.repository.delete(id);
  }
}