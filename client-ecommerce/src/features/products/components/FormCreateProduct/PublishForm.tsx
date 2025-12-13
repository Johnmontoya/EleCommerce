import React from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";

interface PublishProps {
  isPublished: boolean;
}

interface CardPublishProps {
  product: PublishProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const PublishForm: React.FC<CardPublishProps> = ({ product, setCreateData }) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setCreateData({ ...product, [name]: checked });
    } else if (type === "number") {
      setCreateData({ ...product, [name]: parseFloat(value) || 0 });
    } else {
      setCreateData({ ...product, [name]: value });
    }
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        {product.isPublished ? (
          <BsEye size={20} className="text-cyan-400" />
        ) : (
          <FiEyeOff size={20} className="text-slate-400" />
        )}
        Estado de Publicación
      </h2>

      <label className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-all">
        <input
          type="checkbox"
          name="isPublished"
          checked={product.isPublished}
          onChange={handleInputChange}
          className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
        />
        <div>
          <p className="text-slate-200 font-medium">Publicar Producto</p>
          <p className="text-slate-500 text-xs">
            El producto será visible en la tienda
          </p>
        </div>
      </label>
    </div>
  );
};

export default PublishForm;
