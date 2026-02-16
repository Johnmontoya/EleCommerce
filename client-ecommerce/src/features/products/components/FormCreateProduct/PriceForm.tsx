import React from "react";
import { FaDollarSign } from "react-icons/fa";
import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";

interface PriceFormProps {
  register: any;
  errors: any;
  watch: any;
}

const PriceForm: React.FC<PriceFormProps> = ({ register, errors, watch }) => {
  const price = watch('price');
  const priceDiscount = watch('priceDiscount');

  const calculateFinalPrice = () => {
    const discount = (price * priceDiscount) / 100;
    return price - discount;
  };

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <FaDollarSign size={20} className="text-cyan-400" />
        Precio e Inventario
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Precio */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Precio *
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-slate-700/50 border ${errors.price ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="249900"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Descuento (%)
          </label>
          <input
            type="number"
            {...register('priceDiscount', { valueAsNumber: true })}
            min="0"
            max="100"
            className={`w-full bg-slate-700/50 border ${errors.priceDiscount ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="19"
          />
          {errors.priceDiscount && (
            <p className="text-red-500 text-sm mt-1">{errors.priceDiscount.message}</p>
          )}
        </div>

        {/* Precio Final (si hay descuento) */}
        {priceDiscount > 0 && (
          <div className="col-span-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-slate-400 text-sm mb-1">Precio Final:</p>
            <p className="text-2xl font-bold text-cyan-400">
              ${calculateFinalPrice().toFixed(2)}
            </p>
          </div>
        )}

        {/* Stock */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Stock *
          </label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-slate-700/50 border ${errors.stock ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="65"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            SKU *
          </label>
          <input
            type="text"
            {...register('sku')}
            className={`w-full bg-slate-700/50 border ${errors.sku ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="AUD-PROX-2024"
          />
          {errors.sku && (
            <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
          )}
        </div>

        {/* Código de Barras */}
        <div className="col-span-2">
          <label className="block text-slate-300 font-semibold mb-2">
            Código de Barras
          </label>
          <input
            type="text"
            {...register('barcode')}
            className={`w-full bg-slate-700/50 border ${errors.barcode ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="8909876543211"
          />
          {errors.barcode && (
            <p className="text-red-500 text-sm mt-1">{errors.barcode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceForm;