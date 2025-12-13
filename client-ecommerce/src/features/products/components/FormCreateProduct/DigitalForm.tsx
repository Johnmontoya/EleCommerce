import React from "react";
import { BiUpload } from "react-icons/bi";

interface DigitalProps {
  isDigital: boolean;
  digitalFile: string;
}

interface CardDigitalProps {
  product: DigitalProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const DigitalForm: React.FC<CardDigitalProps> = ({ product, onChangeCreateData }) => {
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BiUpload size={20} className="text-cyan-400" />
        Producto Digital
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="isDigital"
            checked={product.isDigital}
            onChange={onChangeCreateData}
            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-slate-300 font-medium">
            Es un producto digital
          </span>
        </label>

        {product.isDigital && (
          <div>
            <label className="block text-slate-300 font-semibold mb-2 text-sm">
              Archivo Digital (URL)
            </label>
            <input
              type="url"
              name="digitalFile"
              value={product.digitalFile}
              onChange={onChangeCreateData}
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="https://..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalForm;
