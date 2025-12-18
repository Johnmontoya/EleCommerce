import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  from,
  map,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import type { SearchState } from "../types/search.types";
import { searchApi } from "../api/searchApi";

class SearchService {
  // Subject para recibir queries
  private searchQuerySubject = new Subject<string>();

  // BehaviorSubject para el estado de búsqueda
  private searchStateSubject = new BehaviorSubject<SearchState>({
    results: [],
    isLoading: false,
    error: null,
    query: "",
  });

  // Observable público del estado
  public searchState$ = this.searchStateSubject.asObservable();

  constructor() {
    this.initializeSearch();
  }

  private initializeSearch() {
    this.searchQuerySubject
      .pipe(
        // Actualizar query en el estado
        tap((query) => {
          this.updateState({ query, isLoading: true, error: null });
        }),
        // Esperar 500ms después de que el usuario deje de escribir
        debounceTime(500),
        // Solo buscar si el término cambió
        distinctUntilChanged(),
        // Cancelar búsqueda anterior y hacer una nueva
        switchMap((query) => {
          // Si está vacío, retornar array vacío
          if (!query.trim()) {
            return from([[]]);
          }

          // Hacer la búsqueda
          return from(searchApi.searchProducts(query)).pipe(
            // Mapear la respuesta
            map((products) => products),
            // Manejar errores
            catchError((error) => {
              console.error("Error en búsqueda:", error);
              this.updateState({
                error: "Error al buscar productos",
                isLoading: false,
              });
              return from([[]]);
            })
          );
        })
      )
      .subscribe((results) => {
        this.updateState({
          results,
          isLoading: false,
          error: null,
        });
      });
  }

  // Método público para realizar búsqueda
  public search(query: string) {
    this.searchQuerySubject.next(query);
  }

  // Limpiar resultados
  public clearResults() {
    this.updateState({
      results: [],
      query: "",
      isLoading: false,
      error: null,
    });
  }

  private updateState(partialState: Partial<SearchState>) {
    const currentState = this.searchStateSubject.value;
    this.searchStateSubject.next({
      // ← Emite el nuevo estado
      ...currentState,
      ...partialState,
    });
  }

  // Obtener estado actual
  public getCurrentState(): SearchState {
    return this.searchStateSubject.value;
  }
}

// Singleton del servicio
export const searchService = new SearchService();
