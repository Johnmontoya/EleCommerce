import React from "react";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";

interface CardProductPros {
    product: ProductProps;
    viewMode: String;
}

interface ProductProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
}
const CardProductList: React.FC<CardProductPros> = ({product, viewMode}) => {
    const navigate = useNavigate()
  return (
    <div
      key={product.id}
      className={`bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all group ${
        viewMode === "list" ? "flex gap-6" : ""
      }`}
    >
      <div
        className={`bg-slate-900/50 flex items-center justify-center overflow-hidden ${
          viewMode === "list" ? "w-48 shrink-0" : "h-64"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex-1">
        <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-cyan-400">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-slate-500 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <ButtonAction
          className="w-full flex items-center justify-center"
          onClick={() => navigate("/cart")}
          children={<BsCartPlus size={18} />}
          text={"Agregar al carrito"}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default CardProductList;
