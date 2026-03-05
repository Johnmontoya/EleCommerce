import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";
import React from "react";

interface StatisticsFormProps {
  register: UseFormRegister<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
}

const StatisticsForm: React.FC<StatisticsFormProps> = ({ register, errors }) => {
  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [ESTADISTICAS]
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [Puntuacion]
          </label>
          <input
            type="number"
            {...register('rating', { valueAsNumber: true })}
            min="0"
            max="5"
            step="0.1"
            className={`w-full bg-black border ${errors.rating ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[4.8]"
          />
          {errors.rating && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.rating.message as string}]</p>
          )}
        </div>

        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [CANTIDAD_RESEÑAS]
          </label>
          <input
            type="number"
            {...register('reviewsCount', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-black border ${errors.reviewsCount ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[112]"
          />
          {errors.reviewsCount && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.reviewsCount.message as string}]</p>
          )}
        </div>

        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [UNIDADES_VENDIDAS]
          </label>
          <input
            type="number"
            {...register('soldCount', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-black border ${errors.soldCount ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[890]"
          />
          {errors.soldCount && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.soldCount.message as string}]</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsForm;