import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../products/types/product.types";

interface SearchResultItemProps {
  success: boolean;
  data: Product;
  onClose: () => void;
}

export const SearchResultItem: React.FC<SearchResultItemProps> = ({
  data,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${data.slug}`);
    onClose();
  };

  const finalPrice = data.priceDiscount
    ? data.price - (data.price * data.priceDiscount) / 100
    : data.price;

  console.log(data);
  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-3 hover:bg-slate-700/50 cursor-pointer transition-all rounded-lg group"
    >
      <img
        src={data.image}
        alt={data.name}
        className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform"
      />
      <div className="flex-1">
        <h3 className="text-slate-100 font-semibold group-hover:text-cyan-400 transition-colors line-clamp-1">
          {data.name}
        </h3>
        <p className="text-slate-500 text-xs">{data.category.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cyan-400 font-bold">${finalPrice}</span>
          {data.priceDiscount && (
            <span className="text-slate-500 line-through text-xs">
              ${data.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      {data.stock! <= 0 && (
        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-semibold">
          Agotado
        </span>
      )}
    </div>
  );
};