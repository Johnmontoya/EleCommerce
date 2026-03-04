import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import type { Product } from "../../types/product.types";
import { useCartAddMutation } from "../../../cart/hook/mutation/useCartMutation";

interface CardProductPros {
  product: Product;
  viewMode: String;
}

const CardProductList: React.FC<CardProductPros> = ({ product, viewMode }) => {
  const navigate = useNavigate();
  const useCartMutation = useCartAddMutation();

  const handleAddToCart = async () => {
    await useCartMutation.mutateAsync({
      productId: product?.id!,
      quantity: 1,
      name: product?.name!,
      image: product?.images![0].url!,
      price: product?.price!,
      discount: product?.priceDiscount!,
      stock: product?.stock!,
    });
  };

  return (
    <div
      key={product.id}
      className={`bg-[#050505] border border-zinc-800 relative group overflow-hidden transition-all hover:border-[#00f0ff]/50 flex ${viewMode === "list" ? "flex-col sm:flex-row gap-6 p-4" : "flex-col"
        }`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      <div
        onClick={() => navigate(`/products/${product.slug}`)}
        className={`relative overflow-hidden cursor-pointer bg-black/50 flex items-center justify-center p-4 border-b border-zinc-900 group-hover:border-[#00f0ff]/30 transition-colors ${viewMode === "list" ? "w-full sm:w-64 h-48 shrink-0 border-r border-b-0" : "w-full h-64"
          }`}
      >
        {product.priceDiscount ? (
          <div className="absolute top-2 left-2 bg-[#e4ff00] text-black px-2 py-0.5 text-[10px] font-bold z-10 font-mono tracking-widest border border-black shadow-[2px_2px_0px_#000]">
            -{product.priceDiscount}% OFF
          </div>
        ) : null}

        {/* Scanline subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.03)_50%)] bg-[length:100%_4px] z-10 pointer-events-none" />

        <img
          src={product.images![0].url}
          alt={product.name}
          className={`object-contain transition-all duration-500 grayscale group-hover:grayscale-0 relative z-0 ${viewMode === "list" ? "max-h-full max-w-full" : "h-48 w-full object-contain"}`}
        />
      </div>

      <div className={`flex flex-col flex-1 justify-between bg-[#020202] ${viewMode === "grid" ? "p-4" : "py-2"}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-1">
              CAT_{product.category.slug}
            </p>
            <div className="flex items-center gap-1 bg-zinc-900 px-1 py-0.5 border border-zinc-800">
              <span className="w-1.5 h-1.5 bg-[#00f0ff] animate-pulse"></span>
              <span className="text-zinc-300 text-[10px] font-mono font-bold">
                {product.rating}
              </span>
              <span className="text-zinc-600 text-[9px] font-mono">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          <h3 className="text-zinc-300 font-bold text-sm leading-tight mb-2 line-clamp-2 md:h-10 group-hover:text-white transition-colors" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {product.name}
          </h3>
        </div>

        <div className={`mt-auto pt-3 flex items-end justify-between gap-4 border-t border-zinc-800 border-dashed ${viewMode === "list" ? "flex-row" : "flex-col items-stretch"}`}>
          {/* Price */}
          <div className="flex flex-col">
            {product.priceDiscount ? (
              <span className="text-zinc-600 line-through text-[10px] font-mono uppercase tracking-widest">
                CR_{product.price}
              </span>
            ) : null}
            <span className="text-lg font-bold text-[#00f0ff] font-mono leading-none tracking-wider">
              CR_{Math.round(
                product.price - (product.price * (product.priceDiscount || 0)) / 100
              )}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black transition-all ${viewMode === "list" ? "px-6 py-2" : "w-full py-2"} font-mono text-[10px] font-bold tracking-widest uppercase`}
          >
            <BsCartPlus size={14} />
            <span className={viewMode === "grid" ? "hidden xs:inline" : ""}>[ADD_TO_CART]</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
