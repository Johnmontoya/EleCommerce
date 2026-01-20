import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsInfiniteQuery } from "../hook/queries/useProduct";
import LoadingFallback from "../../../shared/ui/LoadingFallback";
import { BiHeart, BiStar } from "react-icons/bi";
import { useWishlistAddMutation } from "../../wishlist/hook/mutation/useWishlistMutation";
import type { Product } from "../types/product.types";

const Products = () => {
  const navigate = useNavigate();
  const addWishlistItem = useWishlistAddMutation();
  const observerTarget = useRef<HTMLDivElement>(null);

  const filters = {
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    search: "",
    isPublished: true,
    limit: 10 // Productos por página
  };

  // 🚀 Usar Infinite Query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useProductsInfiniteQuery(filters);

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
  const allProducts = useMemo(() => {
    return data?.pages.flatMap(page => page.data || []) || [];
  }, [data]);

  const handleAddToWishlist = async (item: Product) => {
    await addWishlistItem.mutateAsync({
      productId: item.id,
      productName: item.name,
      productImage: item.images![0],
      price: item.price,
      discount: item.priceDiscount!,
      category: item.category.slug,
      stock: item.stock,
      reviews: item?.reviewsCount!,
      rating: item?.rating!,
      total: item.price - (item.price * item.priceDiscount!) / 100
    });
  };

  if (isLoading) return <LoadingFallback />;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error.message}</div>;

  return (
    <section className="w-full flex flex-col mx-auto justify-center items-center px-4 py-12">
      <h1 className="font-semibold text-xl text-slate-100 my-10 uppercase">
        Productos populares
      </h1>

      {/* Grid de productos */}
      <div className="max-w-7xl h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 m-auto">
        {allProducts.map((item) => (
          <div key={item.id} className="relative">
            <BiHeart
              size={36}
              onClick={() => handleAddToWishlist(item)}
              className="absolute top-3 right-3 z-40 text-slate-300 hover:text-cyan-500 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
            />
            <div
              onClick={() => navigate(`/products/${item.slug}`)}
              className="relative flex w-60 flex-col object-cover overflow-hidden rounded-2xl bg-slate-800/50 border-2 border-slate-700 hover:border-cyan-500/50 drop-shadow-lg/20 drop-shadow-black-500/20 cursor-pointer group"
            >
              {item.priceDiscount ? (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                  -{item.priceDiscount}%
                </div>
              ) : null}
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex flex-col justify-between p-4">
                <p className="h-4 text-cyan-400 text-xs font-semibold mb-2 uppercase">
                  {item.category.slug}
                </p>
                <h3 className="h-16 text-slate-100 font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="h-8 flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <BiStar size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-slate-300 text-sm font-semibold">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs">
                    ({item.reviewsCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-cyan-400">
                    ${Math.round(
                      item.price - (item.price * item.priceDiscount!) / 100
                    )}
                  </span>
                  {item.priceDiscount ? (
                    <span className="text-slate-500 line-through text-sm">
                      ${item.price}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🎯 Elemento observer para scroll infinito */}
      <div
        ref={observerTarget}
        className="w-full h-20 flex justify-center items-center mt-8"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-3 text-cyan-400">
            <div className="w-8 h-8 border-3 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-semibold">Cargando más productos...</span>
          </div>
        )}
      </div>

      {/* Mensaje cuando no hay más productos */}
      {!hasNextPage && allProducts.length > 0 && (
        <div className="w-full text-center text-slate-400 py-8 mt-4">
          <p className="text-sm">
            ✨ Has visto todos los {allProducts.length} productos populares
          </p>
        </div>
      )}

      {/* Mensaje cuando no hay productos */}
      {allProducts.length === 0 && !isLoading && (
        <div className="w-full text-center py-16">
          <p className="text-slate-400 text-lg">
            No hay productos disponibles en este momento
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;