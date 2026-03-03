import React, { useEffect, useRef, useState } from "react";
import { BsGrid, BsList } from "react-icons/bs";
import CardProductList from "../../components/listProducts/CardProductList";
import CardCategoryList from "../../components/listProducts/CardCategoryList";
import CardFilterPrice from "../../components/listProducts/CardFilterPrice";
import CardFilterBrand from "../../components/listProducts/CardFilterBrand";
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
    <div className="min-h-screen bg-[#020202] relative font-mono text-white">
      {/* Elemento decorativo de fondo */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 shrink-0 space-y-6">
            {activeFiltersCount > 0 && (
              <div className="bg-[#050505] border border-zinc-800 p-4 relative mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-[#e4ff00] tracking-widest uppercase">
                    ACTIVE_FILTERS ({activeFiltersCount})
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-[10px] text-zinc-500 hover:text-red-500 font-bold tracking-widest uppercase transition-colors"
                  >
                    [CLR_ALL]
                  </button>
                </div>

                {/* Chips de marcas seleccionadas */}
                {selectedBrands.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedBrands.map(brand => (
                      <span
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-black border border-zinc-800 text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:border-red-500 hover:text-red-500 transition-colors"
                      >
                        {brand}
                        <button className="text-zinc-600 hover:text-red-500 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Chip de categoría */}
                {selectedCategoryObj && (
                  <span
                    onClick={() => setCategory(undefined)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-black border border-zinc-800 text-[#e4ff00] text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:border-red-500 hover:text-red-500 transition-colors mb-2"
                  >
                    {selectedCategoryObj.name}
                    <button className="text-zinc-600 hover:text-red-500 ml-1">×</button>
                  </span>
                )}

                {/* Chip de precio */}
                {(filters.minPrice || filters.maxPrice) && (
                  <span
                    onClick={() => updatePriceRange(0, 1000000)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-black border border-zinc-800 text-white text-[10px] font-bold tracking-widest uppercase cursor-pointer hover:border-red-500 hover:text-red-500 transition-colors"
                  >
                    ${filters.minPrice || 0} - ${filters.maxPrice || 1000000}
                    <button className="text-zinc-600 hover:text-red-500 ml-1">×</button>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                RENDERED {sortedProducts.length} OF{" "}
                <span className="text-[#00f0ff]">
                  {totalProducts} RESULTS
                </span>
                {isFetching && (
                  <span className="ml-2 text-[10px] text-[#e4ff00] animate-pulse">
                    [UPDATING_DB...]
                  </span>
                )}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:block">SORT_ORDER:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-black border border-zinc-800 text-[#00f0ff] px-3 py-2 text-xs font-bold tracking-widest uppercase outline-none focus:border-[#00f0ff] cursor-pointer"
                  >
                    <option value="popularity">POPULARITY</option>
                    <option value="price-low">PRICE_ASC</option>
                    <option value="price-high">PRICE_DESC</option>
                    <option value="newest">LATEST</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 border transition-all ${viewMode === "grid"
                      ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                      : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white"
                      }`}
                  >
                    <BsGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 border transition-all ${viewMode === "list"
                      ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                      : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white"
                      }`}
                  >
                    <BsList size={16} />
                  </button>
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
                    <div className="flex items-center gap-3 text-[#00f0ff] uppercase text-xs font-bold tracking-widest">
                      <div className="w-4 h-4 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin"></div>
                      <span>[LOADING_RECORDS...]</span>
                    </div>
                  )}
                </div>

                {/* Mensaje de fin */}
                {!hasNextPage && sortedProducts.length > 0 && (
                  <div className="text-center text-zinc-600 py-8 border-t border-zinc-800 uppercase text-xs font-bold tracking-widest">
                    <p>
                      END_OF_RESULTS: {sortedProducts.length} RECORDS FOUND
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 border border-zinc-800 bg-[#050505]">
                <p className="text-[#e4ff00] text-sm font-bold tracking-widest uppercase mb-6">
                  ERROR: NO_PRODUCTS_MATCH_PARAMETERS
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-[#00f0ff] text-black font-bold tracking-widest uppercase text-xs hover:bg-black hover:text-[#00f0ff] border border-[#00f0ff] transition-all"
                >
                  RESET_SYS_FILTERS
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