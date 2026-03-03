import { useNavigate } from "react-router-dom";
import { useGetTrends } from "../hooks/useShowcase";
import { BiHeart, BiStar } from "react-icons/bi";
import { useWishlistAddMutation } from "../../wishlist/hook/mutation/useWishlistMutation";
import type { Product } from "../../products/types/product.types";

const Trends = () => {
  const navigate = useNavigate()
  const addWishlistItem = useWishlistAddMutation();

  const { data: trends } = useGetTrends()

  const handleAddToWishlist = async (item: Product) => {
    await addWishlistItem.mutateAsync({
      productId: item.id,
      productName: item.name,
      productImage: item.images![0].url,
      price: item.price,
      discount: item.priceDiscount!,
      category: item.category.slug,
      stock: item.stock,
      reviews: item?.reviewsCount!,
      rating: item?.rating!,
      total: item.price - (item.price * item.priceDiscount!) / 100
    });
  };

  return (
    <section className="w-full flex flex-col mx-auto justify-center items-center px-4 py-12">
      <div className="flex items-center justify-center gap-4 mb-10 w-full relative z-10">
        <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
        <h1 className="font-bold text-2xl text-white uppercase tracking-[0.2em]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          MARKET_TRENDS //
        </h1>
        <div className="h-[1px] bg-zinc-800 flex-1 hidden md:block max-w-xs" />
      </div>
      <div className="max-w-7xl h-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-auto w-full relative z-10">
        {trends?.slice(0, 5).map((item, idx) => (
          <div key={idx} className="relative group">
            <BiHeart size={28}
              onClick={() => handleAddToWishlist(item)}
              className="absolute top-3 right-3 z-40 text-zinc-500 hover:text-[#ff0055] transition-colors cursor-pointer bg-black/50 p-1 border border-transparent hover:border-[#ff0055]" />
            <div
              onClick={() => navigate(`/products/${item.slug}`)}
              className="relative flex w-full flex-col bg-[#050505] border border-zinc-800 hover:border-[#00f0ff] transition-all duration-300 cursor-pointer overflow-hidden h-full"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {item.priceDiscount ? (
                <div className="absolute top-4 left-0 bg-[#e4ff00] text-black px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase z-10 border-r border-y border-black">
                  -{item.priceDiscount}%
                </div>
              ) : null}

              <div className="relative w-full h-56 bg-[#0a0a0a] border-b border-zinc-800 overflow-hidden flex items-center justify-center p-4">
                {/* Scanline subtle */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-10 opacity-30 pointer-events-none" />
                <img
                  src={item.images?.[0].url}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0"
                />
              </div>

              <div className="flex flex-col flex-1 p-4 bg-[#020202]">
                <p className="h-4 text-zinc-500 text-[10px] uppercase tracking-widest font-mono mb-2">
                  CAT // {item.category.slug}
                </p>
                <h3 className="h-12 text-zinc-300 font-bold text-sm mb-3 line-clamp-2 uppercase group-hover:text-white transition-colors" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {item.name}
                </h3>

                {/* Rating (Technical style) */}
                <div className="h-6 flex items-center gap-2 mb-3 mt-auto">
                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5">
                    <BiStar size={10} className="text-[#00f0ff] fill-[#00f0ff]" />
                    <span className="text-zinc-300 text-[10px] font-mono font-bold">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
                    ({item.reviewsCount} REVS)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3 mt-1">
                  <span className="font-mono text-lg font-bold text-[#00f0ff]">
                    ${Math.round(
                      item.price - (item.price * item.priceDiscount!) / 100
                    )}
                  </span>
                  {item.priceDiscount ? (
                    <span className="text-zinc-600 line-through text-xs font-mono">
                      ${item.price}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trends;
