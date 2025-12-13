import React from "react";
import type { Brand } from "../../types/product.types";

interface CardProps {
  brands: Brand[];
  onClick: (index: number) => void;
}

const CardFilterBrand: React.FC<CardProps> = ({ brands, onClick }) => {
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Marcas</h3>
      <ul className="space-y-3">
        {brands.map((brand, index) => (
          <li key={brand.name}>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={brand.checked}
                onChange={() => onClick(index)}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-cyan-400 transition-colors">
                {brand.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardFilterBrand;
