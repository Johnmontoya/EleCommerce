import React from "react";
import { useProductByBrand } from "../../hook/queries/useProduct";
import LoadingFallback from "../../../../shared/ui/LoadingFallback";

interface CardProps {
  selectedBrands: string[]
  onToggleBrand: (brand: string) => void;
}

const CardFilterBrand: React.FC<CardProps> = ({ selectedBrands, onToggleBrand }) => {
  const { data: brands, isLoading } = useProductByBrand();

  if (isLoading) return <LoadingFallback />

  return (
    <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-100">Marcas</h3>
        {/* ✨ Contador de marcas seleccionadas */}
        {selectedBrands.length > 0 && (
          <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
            {selectedBrands.length}
          </span>
        )}
      </div>

      {brands && brands.length > 0 ? (
        <ul className="space-y-3">
          {brands.map((brand) => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <li key={brand}>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleBrand(brand)}
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${isSelected
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 group-hover:text-cyan-400"
                      }`}
                  >
                    {brand}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-slate-400 text-sm">No hay marcas disponibles</p>
      )}
    </div>
  );
};

export default CardFilterBrand;
