import React, { useEffect, useRef, useState } from "react";
import { BsGrid, BsList } from "react-icons/bs";
import CardProductList from "../../components/listProducts/CardProductList";
import CardCategoryList from "../../components/listProducts/CardCategoryList";
import CardFilterPrice from "../../components/listProducts/CardFilterPrice";
import CardFilterBrand from "../../components/listProducts/CardFilterBrand";
import BreadCrumbs from "../../../../shared/ui/BreadCrumbs";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useProductsInfiniteQuery } from "../../hook/queries/useProduct";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { useProductFilters } from "../../hook/queries/useProductFilters";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "../../../categories/hook/queries/useCategory";

const ListProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const itemsPerPage = 4;

  const isInitializedRef = useRef(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const { data: allCategories } = useCategories();

  // 🎯 Usar el hook de filtros
  const {
    filters,
    selectedBrands,
    priceRange,
    selectedCategoryObj,
    toggleBrand,
    updatePriceRange,
    setCategory,
    clearFilters,
    activeFiltersCount,
  } = useProductFilters();

  useEffect(() => {
    if (!isInitializedRef.current) {
      const categoryFromUrl = searchParams.get('category');
      const brandsFromUrl = searchParams.get('brands');
      const minPriceFromUrl = searchParams.get('minPrice');
      const maxPriceFromUrl = searchParams.get('maxPrice');

      // Inicializar filtros desde URL
      if (categoryFromUrl && allCategories && allCategories.length > 0) {
        const categoryObj = allCategories?.find(c => c?.id === categoryFromUrl);
        if (categoryObj) {
          setCategory(categoryObj);
        }
      }

      if (brandsFromUrl) {
        brandsFromUrl.split(',').forEach(brand => toggleBrand(brand));
      }
      if (minPriceFromUrl || maxPriceFromUrl) {
        updatePriceRange(
          minPriceFromUrl ? Number(minPriceFromUrl) : 0,
          maxPriceFromUrl ? Number(maxPriceFromUrl) : 1000
        );
      }

      isInitializedRef.current = true;
    }
  }, []);

  // ✨ Actualizar URL cuando cambian los filtros
  useEffect(() => {
    if (!isInitializedRef.current) return;

    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.brands && filters.brands.length > 0) {
      params.set('brands', filters.brands.join(','));
    }
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.search) params.set('search', filters.search);

    setSearchParams(params, { replace: true });
  }, [filters]);

  // 🚀 Usar React Query Infinite con los filtros
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isFetching
  } = useProductsInfiniteQuery({
    ...filters,
    limit: itemsPerPage,
  });

  // 🔍 Intersection Observer para scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 📦 Combinar todos los productos de todas las páginas
  const allProducts = React.useMemo(() => {
    return data?.pages.flatMap(page => page.data || []) || [];
  }, [data]);

  // 🔢 Calcular total de productos
  const totalProducts = React.useMemo(() => {
    return data?.pages[0]?.total || allProducts.length;
  }, [data, allProducts]);

  // 📊 Ordenar productos según sortBy
  const sortedProducts = React.useMemo(() => {
    if (!allProducts.length) return [];

    const sorted = [...allProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      case 'popularity':
      default:
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
  }, [allProducts, sortBy]);

  if (isLoading) return <LoadingFallback />

  if (error) return <div className="text-red-500 text-center py-8">{error.message}</div>

  return (
    <div className="min-h-screen background-light dark:background-light">
      {/* Breadcrumb */}
      <BreadCrumbs />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0 space-y-6">
            {/* Filtros activos con chips */}
            {activeFiltersCount > 0 && (
              <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-slate-300">
                    Filtros activos ({activeFiltersCount})
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    Limpiar todo
                  </button>
                </div>

                {/* Chips de marcas seleccionadas */}
                {selectedBrands.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedBrands.map(brand => (
                      <span
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full cursor-pointer hover:bg-cyan-500/30 transition-colors"
                      >
                        {brand}
                        <button className="hover:text-cyan-300">×</button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Chip de categoría */}
                {selectedCategoryObj && (
                  <span
                    onClick={() => setCategory(undefined)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full cursor-pointer hover:bg-blue-500/30 transition-colors"
                  >
                    {selectedCategoryObj.name}
                    <button className="hover:text-blue-300">×</button>
                  </span>
                )}

                {/* Chip de precio */}
                {(filters.minPrice || filters.maxPrice) && (
                  <span
                    onClick={() => updatePriceRange(0, 1000000)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full cursor-pointer hover:bg-green-500/30 transition-colors mt-2"
                  >
                    ${filters.minPrice || 0} - ${filters.maxPrice || 1000000}
                    <button className="hover:text-green-300">×</button>
                  </span>
                )}
              </div>
            )}

            {/* Categories */}
            <CardCategoryList
              selectedCategory={filters.category}
              onSelectCategory={setCategory}
            />

            {/* Price Filter */}
            <CardFilterPrice
              priceRange={priceRange}
              onPriceChange={updatePriceRange}
            />

            {/* Brand Filter */}
            <CardFilterBrand
              selectedBrands={selectedBrands}
              onToggleBrand={toggleBrand}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-slate-400">
                Mostrando {sortedProducts.length} de{" "}
                <span className="text-cyan-400 font-semibold">
                  {totalProducts} resultados
                </span>
                {isFetching && (
                  <span className="ml-2 text-xs text-cyan-400">
                    Actualizando...
                  </span>
                )}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Ordenar por:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-700 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="popularity">Popularidad</option>
                    <option value="price-low">Precio: Bajo a Alto</option>
                    <option value="price-high">Precio: Alto a Bajo</option>
                    <option value="newest">Más Recientes</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <ButtonAction
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                      ? "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    text=""
                    variant="outline"
                  >
                    <BsGrid size={20} />
                  </ButtonAction>
                  <ButtonAction
                    className={`p-2 rounded-lg transition-all ${viewMode === "list"
                      ? "bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    onClick={() => setViewMode("list")}
                    text=""
                    variant="outline"
                  >
                    <BsList size={20} />
                  </ButtonAction>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <>
                <div
                  className={`grid gap-6 mb-8 ${viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                    }`}
                >
                  {sortedProducts.map((product) => (
                    <CardProductList
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* 🎯 Elemento observer para scroll infinito */}
                <div
                  ref={observerTarget}
                  className="h-20 flex justify-center items-center my-4"
                >
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-3 text-cyan-400">
                      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Cargando más productos...</span>
                    </div>
                  )}
                </div>

                {/* Mensaje de fin */}
                {!hasNextPage && sortedProducts.length > 0 && (
                  <div className="text-center text-slate-400 py-8 border-t border-slate-700">
                    <p className="text-sm">
                      Has visto todos los {sortedProducts.length} productos disponibles
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-400 text-lg mb-4">
                  No se encontraron productos con estos filtros
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProductsPage;