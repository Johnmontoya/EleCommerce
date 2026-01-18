import React from "react";
import ButtonAction from "../../../../shared/ui/ButtonAction";
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
      image: product?.images![0]!,
      price: product?.price!,
      discount: product?.priceDiscount!,
      stock: product?.stock!,
    });
  };

  return (
    <div
      key={product.id}
      className={`dash-search dark:dash-search border-2 border-slate-600 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group ${viewMode === "list" ? "flex gap-6" : ""
        }`}
    >
      <div
        onClick={() => navigate(`/products/${product.slug}`)}
        className={`dash-search dark:dash-search flex items-center justify-center overflow-hidden cursor-pointer ${viewMode === "list" ? "w-48 shrink-0" : "h-64"
          }`}
      >
        {product.priceDiscount ? (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
            -{product.priceDiscount}%
          </div>
        ) : null}
        <img
          src={product.images![0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex-1 justify-between">
        <p className="h-4 text-cyan-400 text-xs font-semibold mb-2 uppercase">
          {product.category.slug}
        </p>
        <h3 className="h-16 text-slate-100 font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="h-8 flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <BiStar size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-slate-300 text-sm font-semibold">
              {product.rating}
            </span>
          </div>
          <span className="text-slate-500 text-xs">
            ({product.reviewsCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-cyan-400">
            ${Math.round(
              product.price - (product.price * product.priceDiscount!) / 100
            )}
          </span>
          {product.priceDiscount ? (
            <span className="text-slate-500 line-through text-sm">
              ${product.price}
            </span>
          ) : null}
        </div>
        <ButtonAction
          className="w-full h-12 flex items-center justify-center"
          onClick={handleAddToCart}
          text={"Agregar al carrito"}
          variant="primary"
        >
          <BsCartPlus size={18} />
        </ButtonAction>
      </div>
    </div>
  );
};

export default CardProductList;
