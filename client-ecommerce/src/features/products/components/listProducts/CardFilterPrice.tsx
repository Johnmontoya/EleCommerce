import { useEffect, useState } from "react";

interface CardFilterPriceProps {
  priceRange: [number, number];
  onPriceChange: (min: number, max: number) => void;
}

const CardFilterPrice = ({ priceRange, onPriceChange }: CardFilterPriceProps) => {
  const [localMin, setLocalMin] = useState<number>(priceRange[0]);
  const [localMax, setLocalMax] = useState<number>(priceRange[1]);

  useEffect(() => {
    setLocalMin(priceRange[0]);
    setLocalMax(priceRange[1]);
  }, [priceRange]);

  const handleApply = () => {
    onPriceChange(localMin, localMax);
  };

  const handleReset = () => {
    setLocalMin(0);
    setLocalMax(1000000);
    onPriceChange(0, 1000000);
  };

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-6">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />
      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#e4ff00] animate-pulse"></span>
        PRICE_PARAMS //
      </h3>
      <div className="space-y-5">
        {/* Input de precio mínimo */}
        <div>
          <label className="text-[10px] text-zinc-500 tracking-widest uppercase mb-2 block">
            MIN_VALUE [USD]
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
              $
            </span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              className="w-full bg-black border border-zinc-800 text-white pl-8 pr-4 py-3 outline-none focus:border-[#00f0ff] transition-colors text-xs font-bold"
              min={0}
              max={localMax}
            />
          </div>
        </div>

        {/* Input de precio máximo */}
        <div>
          <label className="text-[10px] text-zinc-500 tracking-widest uppercase mb-2 block">
            MAX_VALUE [USD]
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">
              $
            </span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              className="w-full bg-black border border-zinc-800 text-white pl-8 pr-4 py-3 outline-none focus:border-[#00f0ff] transition-colors text-xs font-bold"
              min={localMin}
            />
          </div>
        </div>

        {/* Rango visual */}
        <div className="pt-2 group">
          <input
            type="range"
            min={0}
            max={1000}
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            className="w-full h-1 bg-zinc-800 appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-[#00f0ff] group-hover:[&::-webkit-slider-thumb]:bg-[#e4ff00] transition-colors"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 font-bold mt-3 tracking-widest">
            <span>${localMin}</span>
            <span>${localMax}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-4 border-t border-zinc-900 border-dashed">
          <button
            onClick={handleApply}
            className="flex-1 bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black py-2 text-[10px] font-bold tracking-[0.2em] transition-all uppercase"
          >
            [EXECUTE_Q]
          </button>
          <button
            onClick={handleReset}
            className="px-4 bg-black text-zinc-500 border border-zinc-800 hover:border-red-500 hover:text-red-500 py-2 text-[10px] font-bold tracking-widest transition-all uppercase"
          >
            [CLR]
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFilterPrice;
