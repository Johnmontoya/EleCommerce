import type React from "react";
import { FaDollarSign } from "react-icons/fa";

interface PriceProps {
  price: number;
  priceDiscount: number;
  stock: number;
  sku: string;
  barcode: string;
}

interface CardPriceProps {
  product: PriceProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const PriceForm: React.FC<CardPriceProps> = ({
  product,
  onChangeCreateData,
}) => {
  const calculateFinalPrice = () => {
    const discount = (product.price * product.priceDiscount) / 100;
    return product.price - discount;
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <FaDollarSign size={20} className="text-cyan-400" />
        Precio e Inventario
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Precio *
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChangeCreateData}
            required
            min="0"
            step="0.01"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="249900"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Descuento (%)
          </label>
          <input
            type="number"
            name="priceDiscount"
            value={product.priceDiscount}
            onChange={onChangeCreateData}
            min="0"
            max="100"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="19"
          />
        </div>

        {product.priceDiscount > 0 && (
          <div className="col-span-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-slate-400 text-sm mb-1">Precio Final:</p>
            <p className="text-2xl font-bold text-cyan-400">
              ${calculateFinalPrice().toFixed(2)}
            </p>
          </div>
        )}

        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Stock *
          </label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={onChangeCreateData}
            required
            min="0"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="65"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            SKU *
          </label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={onChangeCreateData}
            required
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="AUD-PROX-2024"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-slate-300 font-semibold mb-2">
            Código de Barras
          </label>
          <input
            type="text"
            name="barcode"
            value={product.barcode}
            onChange={onChangeCreateData}
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="8909876543211"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceForm;
