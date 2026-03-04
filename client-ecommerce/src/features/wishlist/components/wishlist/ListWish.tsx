import React from "react";
import { BiStar, BiX } from "react-icons/bi";
import { CiShoppingCart } from "react-icons/ci";
// Removed duplicate import
import type { WishlistItem } from "../../types/wish.types";
import { useWishlistDeleteMutation } from "../../hook/mutation/useWishlistMutation";
import { useCartAddMutation } from "../../../cart/hook/mutation/useCartMutation";

interface WishlistItemProps {
  wishlistItems: WishlistItem[] | undefined | null,
}

const ListWish: React.FC<WishlistItemProps> = ({ wishlistItems }) => {
  const deleteWishlistItem = useWishlistDeleteMutation();
  const useCartMutation = useCartAddMutation();

  const handleRemoveItem = async (id: string) => {
    await deleteWishlistItem.mutateAsync(id);
  };

  const handleAddToCart = async (item: any) => {
    await useCartMutation.mutateAsync({
      productId: item.productId,
      quantity: 1,
      name: item.productName,
      image: item.productImage,
      price: item.price!,
      discount: item.discount!,
      stock: item.stock!,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistItems?.map((item) => (
        <div
          key={item.id}
          className="bg-[#050505] border border-zinc-800 overflow-hidden group hover:border-[#00f0ff] transition-all relative"
        >
          {/* Neon Scanner Accent */}
          <div className="absolute top-0 right-0 w-full h-[1px] bg-[#00f0ff]/50 -translate-x-[100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-20"></div>

          {item.discount ? (
            <div className="absolute top-0 left-0 bg-[#ff0055] text-white px-3 py-1 font-mono text-[10px] tracking-widest z-10 uppercase">
              -{item.discount}% [PROMO]
            </div>
          ) : null}

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="absolute top-3 right-3 bg-black/80 border border-zinc-800 hover:border-[#ff0055] text-zinc-500 hover:text-[#ff0055] p-2 transition-all z-10 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.8)]"
            aria-label="Remove item"
          >
            <BiX size={18} />
          </button>

          {/* Image */}
          <div className="relative h-64 bg-[#0a0a0a] overflow-hidden">
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            {/* Overlay grid effect on image */}
            <div className="absolute inset-0 bg-[#00f0ff]/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay pointer-events-none"></div>

            {!item && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 font-mono text-xs uppercase tracking-widest border border-red-500">
                  [OUT_OF_STOCK]
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-4 border-t border-zinc-800">
            <div className="flex flex-col gap-2">
              <p className="text-[#e4ff00] text-[10px] font-mono tracking-widest uppercase mb-1">
                [{item.category}]
              </p>
              <h3 className="h-12 text-zinc-100 font-bold text-sm uppercase tracking-wide mb-2 line-clamp-2 group-hover:text-[#00f0ff] transition-colors leading-tight">
                {item.productName}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 border border-amber-400/30 bg-amber-400/10 px-2 py-0.5">
                  <BiStar size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 text-xs font-mono">
                    {item.rating}
                  </span>
                </div>
                <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                  REV:{item.reviews}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4 h-8 border-l-2 border-[#00f0ff] pl-2">
                <span className="text-xl font-mono text-zinc-100 tracking-wider">
                  ${item.price}
                </span>
                {item.discount && (
                  <span className="text-zinc-600 line-through text-xs font-mono">
                    ${item.total}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(item)}
            disabled={!item.stock}
            className={`w-full h-12 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-widest transition-all ${item.stock
              ? "bg-[#00f0ff] text-black hover:bg-white border-t border-[#00f0ff]"
              : "bg-zinc-900 border-t border-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
          >
            <CiShoppingCart size={18} />
            {item.stock ? "[ADD_TO_CART]" : "[UNAVAILABLE]"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListWish;
