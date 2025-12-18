import React, { useState } from "react";
import { BiPlus, BiTag, BiX } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface Variant {
  name: string;
  options: string[];
}

interface VariantProps {
  variants: Variant[];
}

interface CardVariantProps {
  product: VariantProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const VariantForm: React.FC<CardVariantProps> = ({ product, setCreateData }) => {
  const [newVariantName, setNewVariantName] = useState<string>("");
  const [newVariantOption, setNewVariantOption] = useState<string>("");

  const addVariant = () => {
    if (newVariantName.trim()) {
      setCreateData({
        ...product,
        variants: [
          ...product.variants,
          { name: newVariantName.trim(), options: [] },
        ],
      });
      setNewVariantName("");
    }
  };

  const addVariantOption = (variantIndex: number) => {
    if (newVariantOption.trim()) {
      const updatedVariants = [...product.variants];
      updatedVariants[variantIndex].options.push(newVariantOption.trim());
      setCreateData({ ...product, variants: updatedVariants });
      setNewVariantOption("");
    }
  };

  const removeVariant = (index: number) => {
    setCreateData({
      ...product,
      variants: product.variants.filter((_, i) => i !== index),
    });
  };


  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...product.variants];
    updatedVariants[variantIndex].options = updatedVariants[
      variantIndex
    ].options.filter((_, i) => i !== optionIndex);
    setCreateData({ ...product, variants: updatedVariants });
  };
  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiTag size={20} className="text-cyan-400" />
        Variantes
      </h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Nombre de variante (Ej: Color, Talla)"
          />
          <ButtonAction
            onClick={addVariant}
            variant="primary"
            text="Agregar"
          >
            <BiPlus size={18} />
          </ButtonAction>
        </div>

        {product.variants.map((variant, variantIndex) => (
          <div
            key={variantIndex}
            className="bg-slate-700/30 border border-slate-600 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-100 font-semibold">{variant.name}</h3>
              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <BsTrash2 size={16} />
              </button>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newVariantOption}
                onChange={(e) => setNewVariantOption(e.target.value)}
                className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
                placeholder="Agregar opción"
              />
              <button
                type="button"
                onClick={() => addVariantOption(variantIndex)}
                className="bg-slate-600 hover:bg-slate-500 text-slate-200 px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                <BiPlus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {variant.options.map((option, optionIndex) => (
                <span
                  key={optionIndex}
                  className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {option}
                  <button
                    type="button"
                    onClick={() =>
                      removeVariantOption(variantIndex, optionIndex)
                    }
                    className="hover:text-cyan-300 transition-colors"
                  >
                    <BiX size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantForm;
