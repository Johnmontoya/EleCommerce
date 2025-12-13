import React from "react";
import { BiBarChart } from "react-icons/bi";

interface RatingProps {
    rating: number;
    reviewsCount: number;
    soldCount: number;
}

interface CardRatingProps {
  product: RatingProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const StatisticsForm: React.FC<CardRatingProps> = ({ product, onChangeCreateData }) => {
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
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
            name="rating"
            value={product.rating}
            onChange={onChangeCreateData}
            min="0"
            max="5"
            step="0.1"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="4.8"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Número de Reviews
          </label>
          <input
            type="number"
            name="reviewsCount"
            value={product.reviewsCount}
            onChange={onChangeCreateData}
            min="0"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="112"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2 text-sm">
            Unidades Vendidas
          </label>
          <input
            type="number"
            name="soldCount"
            value={product.soldCount}
            onChange={onChangeCreateData}
            min="0"
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="890"
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsForm;
