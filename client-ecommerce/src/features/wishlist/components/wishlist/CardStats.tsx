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
      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Valor Total</p>
            <p className="text-2xl font-bold text-cyan-400">
              ${totalValue}
            </p>
          </div>
          <div className="bg-cyan-500/20 p-3 rounded-lg">
            <BiTrendingUp className="text-cyan-400" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Productos Disponibles</p>
            <p className="text-2xl font-bold text-green-400">
              {inStockCount}/{wishlistItems?.length}
            </p>
          </div>
          <div className="bg-green-500/20 p-3 rounded-lg">
            <BiPackage className="text-green-400" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Ahorro Total</p>
            <p className="text-2xl font-bold text-orange-400">
              ${totalSavings}
            </p>
          </div>
          <div className="bg-orange-500/20 p-3 rounded-lg">
            <BiHeart className="text-orange-400 fill-orange-400" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardStats;
