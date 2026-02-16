import React from "react";
import { BsTruck } from "react-icons/bs";

interface ShippingFormProps {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ register, watch, errors }) => {
  const isFreeShipping = watch('shipping.free');

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BsTruck size={20} className="text-cyan-400" />
        Envío
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('shipping.free')}
            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-slate-300 font-medium">Envío Gratis</span>
        </label>

        {!isFreeShipping && (
          <div>
            <label className="block text-slate-300 font-semibold mb-2 text-sm">
              Costo de Envío
            </label>
            <input
              type="number"
              {...register('shipping.cost', { valueAsNumber: true })}
              min="0"
              step="0.01"
              className={`w-full bg-slate-700/50 border ${errors.shipping?.cost ? 'border-red-500' : 'border-slate-600'
                } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
              placeholder="0.00"
            />
            {errors.shipping?.cost && (
              <p className="text-red-500 text-xs mt-1">{errors.shipping.cost.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;