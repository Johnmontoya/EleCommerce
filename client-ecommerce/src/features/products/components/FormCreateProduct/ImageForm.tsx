import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsImage, BsTrash2 } from "react-icons/bs";

interface ImagesProps {
  images: string[];
}

interface CardImagesProps {
  product: ImagesProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const ImageForm: React.FC<CardImagesProps> = ({ product, setCreateData }) => {
  const [newImage, setNewImage] = useState<string>("");
  const addImage = () => {
    if (newImage.trim() && !product.images.includes(newImage.trim())) {
      setCreateData({ ...product, images: [...product.images, newImage.trim()] });
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setCreateData({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BsImage size={20} className="text-cyan-400" />
        Imágenes del Producto
      </h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="URL de la imagen"
          />
          <button
            type="button"
            onClick={addImage}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <BiPlus size={18} />
            Agregar
          </button>
        </div>

        {product.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative group bg-slate-700/50 border border-slate-600 rounded-lg overflow-hidden"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <BsTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
