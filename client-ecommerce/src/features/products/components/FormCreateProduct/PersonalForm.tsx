import React from "react";
import { BiPackage } from "react-icons/bi";

interface PersonalProps {
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
}

interface CardPersonalProps {
  product: PersonalProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
  getFieldsError: (fieldName: string) => string | undefined;
}

const PersonalForm: React.FC<CardPersonalProps> = ({
  product,
  onChangeCreateData,
  getFieldsError
}) => {
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiPackage size={20} className="text-cyan-400" />
        Información Básica
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-2">
            Nombre del Producto *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChangeCreateData}
            required
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Ej: Audífonos Inalámbricos Pro X"
          />

          <div className="text-red-500 text-sm mt-1">
            {getFieldsError?.("name")}
          </div>
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
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
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
            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
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
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
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
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={onChangeCreateData}
              required
              className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              placeholder="ID de categoría"
            />
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