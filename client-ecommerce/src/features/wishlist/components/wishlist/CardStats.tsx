import React from "react";
import { BiHeart, BiPackage, BiTrendingUp } from "react-icons/bi";
import type { WishlistItem } from "../../types/wish.types";

interface WishlistItemProps {
  wishlistItems: WishlistItem[] | undefined | null
}

const CardStats: React.FC<WishlistItemProps> = ({ wishlistItems }) => {

  const totalValue = wishlistItems?.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = wishlistItems?.filter((item) => item.stock).length;
  const totalSavings = wishlistItems?.reduce((sum, item) => {
    if (item.price) {
      return sum + (item.price - item.total);
    }
    return sum;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#050505] border border-zinc-800 p-4 relative overflow-hidden group">
        {/* Neon Accent Base */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">[TOTAL_VALUE]</p>
            <p className="text-2xl font-bold text-[#00f0ff] drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
              ${totalValue}
            </p>
          </div>
          <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/10 p-3">
            <BiTrendingUp className="text-[#00f0ff]" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-zinc-800 p-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e4ff00] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">[AVAILABLE_UNITS]</p>
            <p className="text-2xl font-bold text-[#e4ff00] drop-shadow-[0_0_5px_rgba(228,255,0,0.3)]">
              {inStockCount}/{wishlistItems?.length}
            </p>
          </div>
          <div className="border border-[#e4ff00]/30 bg-[#e4ff00]/10 p-3">
            <BiPackage className="text-[#e4ff00]" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-zinc-800 p-4 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055] opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">[TOTAL_SAVINGS]</p>
            <p className="text-2xl font-bold text-[#ff0055] drop-shadow-[0_0_5px_rgba(255,0,85,0.3)]">
              ${totalSavings}
            </p>
          </div>
          <div className="border border-[#ff0055]/30 bg-[#ff0055]/10 p-3">
            <BiHeart className="text-[#ff0055]" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
