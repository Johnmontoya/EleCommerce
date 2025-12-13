import React from "react";
import { BsTruck } from "react-icons/bs";

interface Shipping {
  free: boolean;
  cost: number;
}

interface ShippingData {
  shipping: Shipping;
}

interface CardShippingProps {
  product: ShippingData;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const ShippingData: React.FC<CardShippingProps> = ({ product, setCreateData }) => {
  const handleShippingChange = (
    field: keyof Shipping,
    value: string | boolean
  ) => {
    setCreateData({
      ...product,
      shipping: {
        ...product.shipping,
        [field]: field === "free" ? value : parseFloat(value as string) || 0,
      },
    });
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BsTruck size={20} className="text-cyan-400" />
        Envío
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={product.shipping.free}
            onChange={(e) => handleShippingChange("free", e.target.checked)}
            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-slate-300 font-medium">Envío Gratis</span>
        </label>

        {!product.shipping.free && (
          <div>
            <label className="block text-slate-300 font-semibold mb-2 text-sm">
              Costo de Envío
            </label>
            <input
              type="number"
              value={product.shipping.cost}
              onChange={(e) => handleShippingChange("cost", e.target.value)}
              min="0"
              step="0.01"
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="0.00"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingData;
