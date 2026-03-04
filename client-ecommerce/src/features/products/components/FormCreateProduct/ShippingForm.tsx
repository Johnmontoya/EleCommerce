import React from "react";

interface ShippingFormProps {
  register: any;
  watch: any;
  setValue: any;
  errors: any;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ register, watch, errors }) => {
  const isFreeShipping = watch('shipping.free');

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [SHIPPING_CONFIG]
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            {...register('shipping.free')}
            className="appearance-none w-4 h-4 border border-zinc-600 bg-black checked:border-[#00f0ff] flex items-center justify-center cursor-pointer relative
              before:content-[''] before:hidden checked:before:block before:w-2 before:h-2 before:bg-[#00f0ff] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all flex-shrink-0"
          />
          <span className="text-zinc-500 uppercase font-bold tracking-widest text-[10px] peer-checked:text-[#00f0ff] transition-colors">
            [FREE_SHIPPING_ENABLED]
          </span>
        </label>

        {!isFreeShipping && (
          <div>
            <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              [SHIPPING_COST]
            </label>
            <input
              type="number"
              {...register('shipping.cost', { valueAsNumber: true })}
              min="0"
              step="0.01"
              className={`w-full bg-black border ${errors.shipping?.cost ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
                } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
              placeholder="[0.00]"
            />
            {errors.shipping?.cost && (
              <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest font-bold">[{errors.shipping.cost.message}]</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;