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

  return (
    <div
      onClick={handleClick}
      className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-[#050505] border border-zinc-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 cursor-pointer transition-all group relative"
    >
      {/* Accent corner */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative w-16 h-16 sm:min-w-20 sm:min-h-20 border border-zinc-700 p-1 group-hover:border-[#00f0ff]/50 overflow-hidden bg-black flex items-center justify-center">
        {/* Simple grid overlay on image */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0wLDBMNCwwTDEsNEwwLDRaIiBmaWxsPSJyZ2JhKDAsMjQwLDI1NSwwLjEpIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-50 z-10 pointer-events-none"></div>
        <img
          src={data?.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter sepia-[0.3] hue-rotate-180 group-hover:filter-none"
        />
      </div>

      <div className="flex-1 flex flex-col w-full">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-zinc-100 font-mono tracking-wider font-bold group-hover:text-[#00f0ff] transition-colors line-clamp-1 uppercase text-sm">
            {data.name}
          </h3>
          {data.stock! <= 0 && (
            <span className="bg-[#ff0055]/10 text-[#ff0055] border border-[#ff0055] px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase">
              [AGOTADO]
            </span>
          )}
        </div>

        <p className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">[{data.category.name}]</p>

        <div className="flex items-center gap-3 mt-auto">
          <span className="text-[#e4ff00] font-mono tracking-wider font-bold bg-[#e4ff00]/10 border border-[#e4ff00]/30 px-2 py-1">
            CR_{finalPrice.toFixed(2)}
          </span>
          {data.priceDiscount && (
            <span className="text-zinc-600 line-through font-mono text-xs tracking-wider">
              CR_{data.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};