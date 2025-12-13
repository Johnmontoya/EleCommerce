import { useState } from "react";

const CardFilterPrice = () => {
  const [priceRange, setPriceRange] = useState<number>(1250);
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">
        Filtrar por Precio
      </h3>
      <div className="space-y-4">
        <input
          type="range"
          min="0"
          max="2500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-sm text-slate-400">
          <span>${0}</span>
          <span className="text-cyan-400 font-semibold">${priceRange}</span>
          <span>${2500}</span>
        </div>
      </div>
    </div>
  );
};

export default CardFilterPrice;
