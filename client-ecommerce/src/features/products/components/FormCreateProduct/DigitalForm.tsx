import React from "react";
import { BiUpload } from "react-icons/bi";

interface DigitalFormProps {
  register: any;
  watch: any;
  errors: any;
}

const DigitalForm: React.FC<DigitalFormProps> = ({ register, watch, errors }) => {
  const isDigital = watch('isDigital');

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BiUpload size={20} className="text-cyan-400" />
        Producto Digital
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('isDigital')}
            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-slate-300 font-medium">
            Es un producto digital
          </span>
        </label>

        {isDigital && (
          <div>
            <label className="block text-slate-300 font-semibold mb-2 text-sm">
              Archivo Digital (URL)
            </label>
            <input
              type="url"
              {...register('digitalFile')}
              className={`w-full bg-slate-700/50 border ${errors.digitalFile ? 'border-red-500' : 'border-slate-600'
                } text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
              placeholder="https://..."
            />
            {errors.digitalFile && (
              <p className="text-red-500 text-xs mt-1">{errors.digitalFile.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalForm;