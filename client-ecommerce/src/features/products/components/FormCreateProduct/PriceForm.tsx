import React from "react";
import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";

interface PriceFormProps {
  register: UseFormRegister<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
  watch: UseFormWatch<ProductSchemaType>;
}

const PriceForm: React.FC<PriceFormProps> = ({ register, errors, watch }) => {
  const price = watch('price');
  const priceDiscount = watch('priceDiscount');

  const calculateFinalPrice = () => {
    const discount = (price * priceDiscount) / 100;
    return price - discount;
  };

  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [PRECIO_Y_INVENTARIO]
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Precio */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [PRECIO] *
          </label>
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-black border ${errors.price ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[249900]"
          />
          {errors.price && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.price.message as string}]</p>
          )}
        </div>

        {/* Descuento */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [DESCUENTO] (%)
          </label>
          <input
            type="number"
            {...register('priceDiscount', { valueAsNumber: true })}
            min="0"
            max="100"
            className={`w-full bg-black border ${errors.priceDiscount ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[19]"
          />
          {errors.priceDiscount && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.priceDiscount.message as string}]</p>
          )}
        </div>

        {/* Precio Final (si hay descuento) */}
        {priceDiscount > 0 && (
          <div className="col-span-2 bg-[#e4ff00]/10 border border-[#e4ff00]/30 rounded-none p-4 flex flex-col items-center justify-center relative">
            <div className="absolute top-2 left-2 w-1 h-1 bg-[#e4ff00] animate-pulse"></div>
            <p className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">[FINAL_COMPUTED_PRICE]:</p>
            <p className="text-xl font-bold text-[#e4ff00] font-mono tracking-widest">
              CR_{calculateFinalPrice().toFixed(2)}
            </p>
          </div>
        )}

        {/* Stock */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [STOCK] *
          </label>
          <input
            type="number"
            {...register('stock', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-black border ${errors.stock ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[65]"
          />
          {errors.stock && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.stock.message as string}]</p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [SKU] *
          </label>
          <input
            type="text"
            {...register('sku')}
            className={`w-full bg-black border ${errors.sku ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[AUD-PROX-2024]"
          />
          {errors.sku && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.sku.message as string}]</p>
          )}
        </div>

        {/* Código de Barras */}
        <div className="col-span-2">
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [CODIGO_DE_BARRAS]
          </label>
          <input
            type="text"
            {...register('barcode')}
            className={`w-full bg-black border ${errors.barcode ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[8909876543211]"
          />
          {errors.barcode && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.barcode.message as string}]</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceForm;