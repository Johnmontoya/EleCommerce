import React from "react";
import type { UseFormRegister, UseFormWatch, FieldErrors, FieldValues } from "react-hook-form";

interface DigitalFormValues extends FieldValues {
  isDigital: boolean;
  digitalFile: string;
}

interface DigitalFormProps {
  register: UseFormRegister<DigitalFormValues>;
  watch: UseFormWatch<DigitalFormValues>;
  errors: FieldErrors<DigitalFormValues>;
}

const DigitalForm: React.FC<DigitalFormProps> = ({ register, watch, errors }) => {
  const isDigital = watch('isDigital');

  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [PRODUCTO_DIGITAL]
      </h2>

      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('isDigital')}
            className="appearance-none w-4 h-4 border border-zinc-600 bg-black checked:border-[#00f0ff] flex items-center justify-center cursor-pointer relative
              before:content-[''] before:hidden checked:before:block before:w-2 before:h-2 before:bg-[#00f0ff] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all"
          />
          <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest peer-checked:text-[#00f0ff] transition-colors">
            [HABILITAR_ENVIO_DIGITAL]
          </span>
        </label>

        {isDigital && (
          <div>
            <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              [ARCHIVO_DIGITAL]
            </label>
            <input
              type="url"
              {...register('digitalFile')}
              className={`w-full bg-black border ${errors.digitalFile ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
                } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
              placeholder="[HTTPS://...]"
            />
            {errors.digitalFile && (
              <p className="text-[#ff0055] text-[10px] uppercase tracking-widest font-bold mt-1">[{errors.digitalFile.message as string}]</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalForm;