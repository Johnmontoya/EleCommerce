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

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em]">MANUF_ORIGIN //</h3>
        {/* ✨ Contador de marcas seleccionadas */}
        {selectedBrands.length > 0 && (
          <span className="px-2 py-0.5 bg-[#00f0ff] border border-[#00f0ff] text-black text-[10px] font-bold">
            {selectedBrands.length}
          </span>
        )}
      </div>

      {brands && brands.length > 0 ? (
        <ul className="space-y-4">
          {brands.map((brand) => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <li key={brand}>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#00f0ff]/20 border-[#00f0ff]' : 'bg-black border-zinc-700 group-hover:border-[#00f0ff]'}`}>
                    {isSelected && <div className="w-2 h-2 bg-[#00f0ff]" />}
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleBrand(brand)}
                    className="hidden"
                  />
                  <span
                    className={`transition-colors text-xs tracking-widest uppercase ${isSelected
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
        <div className="text-zinc-600 font-mono text-xs px-4 py-3 bg-black border border-zinc-900 border-dashed uppercase">
          ERROR: SYS_N_BRANDS_FND
        </div>
      )}
    </div>
  );
};

export default CardFilterBrand;
