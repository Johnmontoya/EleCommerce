import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";

interface DimensionFormProps {
  register: UseFormRegister<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
}

const DimensionForm: React.FC<DimensionFormProps> = ({ register, errors }) => {
  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [DIMENSIONES_Y_PESO]
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [PESO_KG]
          </label>
          <input
            type="number"
            {...register('dimensions.weight', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-black border ${errors.dimensions?.weight ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[0.18]"
          />
          {errors.dimensions?.weight && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.dimensions.weight.message as string}]</p>
          )}
        </div>

        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [ANCHO_CM]
          </label>
          <input
            type="number"
            {...register('dimensions.width', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-black border ${errors.dimensions?.width ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[6]"
          />
          {errors.dimensions?.width && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.dimensions.width.message as string}]</p>
          )}
        </div>

        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [ALTO_CM]
          </label>
          <input
            type="number"
            {...register('dimensions.height', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-black border ${errors.dimensions?.height ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[4]"
          />
          {errors.dimensions?.height && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.dimensions.height.message as string}]</p>
          )}
        </div>

        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [PROFUNDIDAD_CM]
          </label>
          <input
            type="number"
            {...register('dimensions.depth', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-black border ${errors.dimensions?.depth ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[3]"
          />
          {errors.dimensions?.depth && (
            <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.dimensions.depth.message as string}]</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DimensionForm;