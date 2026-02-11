import React from "react";
import { BiPackage, BiSearch } from "react-icons/bi";
import { useCategories } from "../../../categories/hook/queries/useCategory";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface PersonalProps {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
}

interface CardPersonalProps {
  product: PersonalProps;
  handleAnalyzeTitle: () => void;
  isSubmitting: boolean;
  createProduct: any;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
  getFieldsError: (fieldName: string) => string | undefined;
}

const PersonalForm: React.FC<CardPersonalProps> = ({
  product,
  handleAnalyzeTitle,
  isSubmitting,
  createProduct,
  onChangeCreateData,
  getFieldsError
}) => {
  const { data: categories } = useCategories();

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiPackage size={20} className="text-cyan-400" />
        Información Básica
      </h2>
      <div className="space-y-4">
        <div className="w-full flex flex-row items-center gap-2">
          <div className="w-full">
            <label className="block text-slate-300 font-semibold mb-2">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={onChangeCreateData}
              required
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Ej: Audífonos Inalámbricos Pro X"
            />

            <div className="text-red-500 text-sm mt-1">
              {getFieldsError?.("name")}
            </div>
          </div>
          <ButtonAction
            variant="primary"
            type="button"
            onClick={handleAnalyzeTitle}
            disabled={isSubmitting || createProduct.isPending}
            className="w-44 h-11 flex flex-row items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-6"
            text="">
            {isSubmitting ? (
              <>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <BiSearch className="w-4 h-4" />
                <span className="md:block hidden">Analizar IA</span>
              </>
            )}
          </ButtonAction>
        </div>
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Slug (URL amigable) *
          </label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={onChangeCreateData}
            required
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="audifonos-inalambricos-pro-x"
          />

          <div className="text-red-500 text-sm mt-1">
            {getFieldsError?.("slug")}
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Descripción *
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChangeCreateData}
            required
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
            placeholder="Describe las características principales del producto..."
          />
          <div className="text-red-500 text-sm mt-0">
            {getFieldsError?.("description")}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Marca
            </label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={onChangeCreateData}
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="Ej: SoundMax"
            />
            <div className="text-red-500 text-sm mt-0">
              {getFieldsError?.("brand")}
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Categoría *
            </label>
            <select
              name="category"
              value={product.category}
              onChange={onChangeCreateData}
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            >
              <option value="" disabled>
                {"Seleccione una categoría"}
              </option>
              {categories?.map((option) => (
                <option key={option.id} value={option.id} className="bg-slate-800">
                  {option.name}
                </option>
              ))}
            </select>

            <div className="text-red-500 text-sm mt-0">
              {getFieldsError?.("category")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;