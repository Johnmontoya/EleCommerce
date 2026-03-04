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
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-6">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#e4ff00] animate-pulse"></span>
          ORIGEN_DE_FABRICACION //
        </h3>
        {/* ✨ Contador de marcas seleccionadas */}
        {selectedBrands.length > 0 && (
          <span className="px-1.5 py-0.5 bg-[#e4ff00] border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black text-[10px] font-bold">
            {selectedBrands.length}
          </span>
        )}
      </div>

      {brands && brands.length > 0 ? (
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar border-t border-zinc-900 border-dashed pt-4">
          {brands.map((brand) => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <li key={brand}>
                <label className={`flex items-center gap-3 cursor-pointer group p-2 border transition-colors ${isSelected ? 'bg-[#00f0ff]/5 border-[#00f0ff]/30' : 'bg-transparent border-transparent hover:border-zinc-800 hover:bg-[#050505]'}`}>
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#00f0ff]/20 border-[#00f0ff]' : 'bg-black border-zinc-700 group-hover:border-[#00f0ff]'}`}>
                    {isSelected && <div className="w-2 h-2 bg-[#00f0ff]" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleBrand(brand)}
                    className="hidden"
                  />
                  <span
                    className={`transition-colors text-[10px] tracking-[0.15em] uppercase font-mono ${isSelected
                      ? "text-[#00f0ff] font-bold"
                      : "text-zinc-500 group-hover:text-white"
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
        <div className="text-[#ff0055] font-mono text-[10px] tracking-widest px-4 py-4 bg-[#050505] border border-zinc-900 border-dashed uppercase text-center mt-4">
          [ERROR: NO_HAY_MARCAS]
        </div>
      )}
    </div>
  );
};

export default CardFilterBrand;
