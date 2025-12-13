import React from "react";
import { BiPackage } from "react-icons/bi";

interface Dimensions {
  weight: number;
  width: number;
  height: number;
  depth: number;
}

interface DimensionProps {
  dimensions: Dimensions;
}

interface CardDimensionProps {
  product: DimensionProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const DimensionData: React.FC<CardDimensionProps> = ({
  product,
  setCreateData,
}) => {
  const handleDimensionChange = (field: keyof Dimensions, value: string) => {
    setCreateData({
      ...product,
      dimensions: {
        ...product.dimensions,
        [field]: parseFloat(value) || 0,
      },
    });
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiPackage size={20} className="text-cyan-400" />
        Dimensiones
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Peso (kg)
          </label>
          <input
            type="number"
            value={product.dimensions.weight}
            onChange={(e) => handleDimensionChange("weight", e.target.value)}
            min="0"
            step="0.01"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="0.18"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Ancho (cm)
          </label>
          <input
            type="number"
            value={product.dimensions.width}
            onChange={(e) => handleDimensionChange("width", e.target.value)}
            min="0"
            step="0.01"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="6"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Alto (cm)
          </label>
          <input
            type="number"
            value={product.dimensions.height}
            onChange={(e) => handleDimensionChange("height", e.target.value)}
            min="0"
            step="0.01"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="4"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Profundidad (cm)
          </label>
          <input
            type="number"
            value={product.dimensions.depth}
            onChange={(e) => handleDimensionChange("depth", e.target.value)}
            min="0"
            step="0.01"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="3"
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionData;
