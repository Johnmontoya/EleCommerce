import React from "react";
import { BiPackage, BiSearch } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCategories } from "../../../categories/hook/queries/useCategory";
import ButtonAction from "../../../../shared/ui/ButtonAction";

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
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiPackage size={20} className="text-cyan-400" />
        Información Básica
      </h2>

      <div className="space-y-4">
        {/* Nombre del Producto con botón Analizar */}
        <div className="w-full flex flex-row items-start gap-2">
          <div className="w-full">
            <label className="block text-slate-300 font-semibold mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              {...register('name')}
              className={`w-full bg-slate-700/50 border ${errors.name ? 'border-red-500' : 'border-slate-600'
                } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
              placeholder="Ej: Audífonos Inalámbricos Pro X"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <ButtonAction
            variant="primary"
            type="button"
            onClick={handleAnalyzeTitle}
            disabled={isSubmitting || !nameValue || nameValue.trim().length === 0}
            className="w-44 h-11 flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md mt-8"
            text=""
          >
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                <span className="md:block hidden">Analizando...</span>
              </>
            ) : (
              <>
                <BiSearch className="w-4 h-4" />
                <span className="md:block hidden">Analizar IA</span>
              </>
            )}
          </ButtonAction>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Slug (URL amigable) *
          </label>
          <input
            type="text"
            {...register('slug')}
            className={`w-full bg-slate-700/50 border ${errors.slug ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            placeholder="audifonos-inalambricos-pro-x"
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Descripción *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full bg-slate-700/50 border ${errors.description ? 'border-red-500' : 'border-slate-600'
              } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none`}
            placeholder="Describe las características principales del producto..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Marca y Categoría */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Marca
            </label>
            <input
              type="text"
              {...register('brand')}
              className={`w-full bg-slate-700/50 border ${errors.brand ? 'border-red-500' : 'border-slate-600'
                } text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
              placeholder="Ej: SoundMax"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Categoría *
            </label>
            <select
              {...register('category')}
              className={`w-full bg-slate-700/50 border ${errors.category ? 'border-red-500' : 'border-slate-600'
                } text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all`}
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {categories?.map((option) => (
                <option key={option.id} value={option.id} className="bg-slate-800">
                  {option.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;