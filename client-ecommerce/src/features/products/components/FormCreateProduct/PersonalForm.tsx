import React from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCategories } from "../../../categories/hook/queries/useCategory";
interface PersonalFormProps {
  register: any;
  errors: any;
  watch: any;
  handleAnalyzeTitle: () => void;
  isSubmitting: boolean;
}

const PersonalForm: React.FC<PersonalFormProps> = ({
  register,
  errors,
  watch,
  handleAnalyzeTitle,
  isSubmitting,
}) => {
  const { data: categories } = useCategories();
  const nameValue = watch('name');

  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [INFORMACION_BASICA]
      </h2>

      <div className="space-y-4">
        {/* Nombre del Producto con botón Analizar */}
        <div className="w-full flex flex-row items-start gap-2">
          <div className="w-full">
            <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              [NOMBRE_PRODUCTO] *
            </label>
            <input
              type="text"
              {...register('name')}
              className={`w-full bg-black border ${errors.name ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
                } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
              placeholder="[EJ:_AUDIFONOS_INALAMBRICOS]"
            />
            {errors.name && (
              <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.name.message}]</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAnalyzeTitle}
            disabled={isSubmitting || !nameValue || nameValue.trim().length === 0}
            className="w-44 h-11 flex flex-row items-center justify-center gap-2 bg-[#00f0ff]/10 hover:bg-[#00f0ff] disabled:bg-zinc-800 disabled:border-zinc-700 disabled:text-zinc-500 text-[#00f0ff] hover:text-black border border-[#00f0ff] px-4 py-2 mt-[28px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                <span className="md:block hidden">[ANALIZANDO...]</span>
              </>
            ) : (
              <>
                <BiSearch className="w-4 h-4" />
                <span className="md:block hidden">[ANALIZAR_CON_AI]</span>
              </>
            )}
          </button>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [SLUG_URL] *
          </label>
          <input
            type="text"
            {...register('slug')}
            className={`w-full bg-black border ${errors.slug ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
            placeholder="[audifonos-inalambricos-pro-x]"
          />
          {errors.slug && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.slug.message}]</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
            [DESCRIPCION] *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full bg-black border ${errors.description ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
              } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all resize-none`}
            placeholder="[DESCRIBE_PRODUCT_FEATURES...]"
          />
          {errors.description && (
            <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.description.message}]</p>
          )}
        </div>

        {/* Marca y Categoría */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              [MARCA]
            </label>
            <input
              type="text"
              {...register('brand')}
              className={`w-full bg-black border ${errors.brand ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
                } text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all`}
              placeholder="[EJ:_SOUNDMAX]"
            />
            {errors.brand && (
              <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.brand.message}]</p>
            )}
          </div>

          <div>
            <label className="block text-[#00f0ff] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
              [CATEGORIA] *
            </label>
            <div className="relative">
              <select
                {...register('category')}
                className={`w-full bg-black border ${errors.category ? 'border-[#ff0055] focus:border-[#ff0055]' : 'border-zinc-800 focus:border-[#00f0ff]'
                  } text-white placeholder-zinc-700 px-4 py-3 pr-10 rounded-none outline-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  [SELECCIONAR_CATEGORIA]
                </option>
                {categories?.map((option) => (
                  <option key={option.id} value={option.id} className="bg-black text-[#00f0ff]">
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00f0ff] text-[10px]">
                ▼
              </div>
            </div>
            {errors.category && (
              <p className="text-[#ff0055] text-[10px] mt-1 uppercase tracking-widest">[{errors.category.message}]</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;