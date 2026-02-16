import React from "react";
import { BiPackage } from "react-icons/bi";

interface DimensionFormProps {
  register: any;
  errors: any;
}

const DimensionForm: React.FC<DimensionFormProps> = ({ register, errors }) => {
  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
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
            {...register('dimensions.weight', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-slate-700/50 border ${errors.dimensions?.weight ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="0.18"
          />
          {errors.dimensions?.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.dimensions.weight.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Ancho (cm)
          </label>
          <input
            type="number"
            {...register('dimensions.width', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-slate-700/50 border ${errors.dimensions?.width ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="6"
          />
          {errors.dimensions?.width && (
            <p className="text-red-500 text-xs mt-1">{errors.dimensions.width.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Alto (cm)
          </label>
          <input
            type="number"
            {...register('dimensions.height', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-slate-700/50 border ${errors.dimensions?.height ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="4"
          />
          {errors.dimensions?.height && (
            <p className="text-red-500 text-xs mt-1">{errors.dimensions.height.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Profundidad (cm)
          </label>
          <input
            type="number"
            {...register('dimensions.depth', { valueAsNumber: true })}
            min="0"
            step="0.01"
            className={`w-full bg-slate-700/50 border ${errors.dimensions?.depth ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="3"
          />
          {errors.dimensions?.depth && (
            <p className="text-red-500 text-xs mt-1">{errors.dimensions.depth.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DimensionForm;