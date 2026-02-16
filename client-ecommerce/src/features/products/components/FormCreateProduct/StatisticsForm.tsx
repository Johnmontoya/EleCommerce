import React from "react";
import { BiBarChart } from "react-icons/bi";

interface StatisticsFormProps {
  register: any;
  errors: any;
}

const StatisticsForm: React.FC<StatisticsFormProps> = ({ register, errors }) => {
  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BiBarChart size={20} className="text-cyan-400" />
        Estadísticas
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Rating
          </label>
          <input
            type="number"
            {...register('rating', { valueAsNumber: true })}
            min="0"
            max="5"
            step="0.1"
            className={`w-full bg-slate-700/50 border ${errors.rating ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="4.8"
          />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Número de Reviews
          </label>
          <input
            type="number"
            {...register('reviewsCount', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-slate-700/50 border ${errors.reviewsCount ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="112"
          />
          {errors.reviewsCount && (
            <p className="text-red-500 text-xs mt-1">{errors.reviewsCount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Unidades Vendidas
          </label>
          <input
            type="number"
            {...register('soldCount', { valueAsNumber: true })}
            min="0"
            className={`w-full bg-slate-700/50 border ${errors.soldCount ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="890"
          />
          {errors.soldCount && (
            <p className="text-red-500 text-xs mt-1">{errors.soldCount.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsForm;