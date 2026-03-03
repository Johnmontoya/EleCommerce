import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import type { Product } from "../../types/product.types";
import { BiStar } from "react-icons/bi";
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
      className={`bg-[#050505] border border-zinc-800 relative group overflow-hidden transition-all hover:border-[#00f0ff]/50 ${viewMode === "list" ? "flex flex-col sm:flex-row gap-6 p-4" : ""
        }`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div
        onClick={() => navigate(`/products/${product.slug}`)}
        className={`relative overflow-hidden cursor-pointer bg-black/50 ${viewMode === "list" ? "w-full sm:w-64 h-48 shrink-0" : "h-64"
          }`}
      >
        {product.priceDiscount ? (
          <div className="absolute top-2 left-2 bg-[#e4ff00] text-black px-2 py-1 text-[10px] font-bold z-10 font-mono tracking-widest border border-[#e4ff00]">
            -{product.priceDiscount}% OFF
          </div>
        ) : null}
        <img
          src={product.images![0].url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
        />

        {/* Overlay grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
      </div>

      <div className={`flex flex-col flex-1 justify-between ${viewMode === "grid" ? "p-5" : "py-2"}`}>
        <div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-[#00f0ff] text-[10px] font-mono font-bold uppercase tracking-widest">
              {product.category.slug}
            </p>
            <div className="flex items-center gap-1 bg-black px-2 py-0.5 border border-zinc-800">
              <BiStar size={10} className="text-[#e4ff00]" />
              <span className="text-zinc-300 text-[10px] font-mono font-bold">
                {product.rating}
              </span>
              <span className="text-zinc-600 text-[10px] font-mono">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 md:h-12 group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {product.name}
          </h3>
        </div>

        <div className={`mt-auto pt-4 flex items-end justify-between gap-4 ${viewMode === "list" ? "flex-row" : "flex-col items-stretch"}`}>
          {/* Price */}
          <div className="flex flex-col">
            {product.priceDiscount ? (
              <span className="text-zinc-600 line-through text-[10px] font-mono">
                USD {product.price}
              </span>
            ) : null}
            <span className="text-xl font-bold text-[#e4ff00] font-mono leading-none">
              ${Math.round(
                product.price - (product.price * (product.priceDiscount || 0)) / 100
              )}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black transition-all ${viewMode === "list" ? "px-6 py-2" : "w-full py-2"} font-mono text-xs font-bold tracking-widest uppercase`}
          >
            <BsCartPlus size={14} />
            <span className={viewMode === "grid" ? "hidden xs:inline" : ""}>ADD_CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
