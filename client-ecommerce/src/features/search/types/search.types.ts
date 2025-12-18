import type { Product } from "../../products/types/product.types";

export interface SearchState {
  results: Product[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}