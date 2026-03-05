import React from "react";

interface PublishFormProps {
  register: any;
  watch: any;
}

const PublishForm: React.FC<PublishFormProps> = ({ register, watch }) => {
  const isPublished = watch('isPublished');

  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className={`w-1.5 h-1.5 inline-block ${isPublished ? 'bg-[#e4ff00] animate-pulse' : 'bg-zinc-600'}`}></span>
        [ESTADO_PUBLICACION]
      </h2>

      <label className="flex items-center gap-4 cursor-pointer bg-black border border-zinc-800 p-4 hover:border-[#00f0ff]/50 transition-all group">
        <input
          type="checkbox"
          {...register('isPublished')}
          className="appearance-none w-5 h-5 border border-zinc-600 bg-black checked:border-[#e4ff00] flex items-center justify-center cursor-pointer relative
              before:content-[''] before:hidden checked:before:block before:w-2.5 before:h-2.5 before:bg-[#e4ff00] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all flex-shrink-0"
        />
        <div>
          <p className="text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] uppercase">[ESTABLECER_PRODUCTO_EN_VIVO]</p>
          <p className="text-zinc-500 text-[8px] uppercase tracking-widest font-bold mt-1">
            [ADVERTENCIA:_EL_ITEM_SEVIENTA_PUBLICAMENTE]
          </p>
        </div>
      </label>
    </div>
  );
};

export default PublishForm;