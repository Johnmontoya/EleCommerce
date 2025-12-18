import { useCallback, useEffect, useState } from "react";
import type { SearchState } from "../types/search.types";
import { searchService } from "../services/searchService";

export const useProductSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null,
    query: "",
  });

  // Suscribirse al observable del servicio
  useEffect(() => {
    const subscription = searchService.searchState$.subscribe((state) => {
      setSearchState(state);
    });

    // Cleanup: desuscribirse cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const search = useCallback((query: string) => {
    searchService.search(query);
  }, []);

  const clearResults = useCallback(() => {
    searchService.clearResults();
  }, []);

  return {
    results: searchState.results,
    isLoading: searchState.isLoading,
    error: searchState.error,
    query: searchState.query,
    search,
    clearResults,
  };
};