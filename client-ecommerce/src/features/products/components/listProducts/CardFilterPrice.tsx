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
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">
        Filtrar por Precio
      </h3>
      <div className="space-y-4">
        {/* Input de precio mínimo */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Precio Mínimo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              $
            </span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 text-slate-100 pl-8 pr-4 py-2 rounded-lg outline-none focus:border-cyan-400"
              min={0}
              max={localMax}
            />
          </div>
        </div>

        {/* Input de precio máximo */}
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Precio Máximo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              $
            </span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 text-slate-100 pl-8 pr-4 py-2 rounded-lg outline-none focus:border-cyan-400"
              min={localMin}
            />
          </div>
        </div>

        {/* Rango visual */}
        <div className="pt-2">
          <input
            type="range"
            min={0}
            max={1000}
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>${localMin}</span>
            <span>${localMax}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 rounded-lg transition-all"
          >
            Aplicar
          </button>
          <button
            onClick={handleReset}
            className="px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 py-2 rounded-lg transition-all"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFilterPrice;
