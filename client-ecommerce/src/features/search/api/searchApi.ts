import type { Product } from "../../products/types/product.types";

export const searchApi = {
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${'http://localhost:8000'}/products/products/search?search=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("Error al buscar productos");
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error("Error en searchProducts:", error);
      throw error;
    }
  },

  getPopularSearches: async (): Promise<string[]> => {
    try {
      const response = await fetch(
        `${'http://localhost:8000'}/products/products`
      );
      const data = await response.json();
      return data.searches || [];
    } catch (error) {
      console.error("Error en getPopularSearches:", error);
      return [];
    }
  }
};
