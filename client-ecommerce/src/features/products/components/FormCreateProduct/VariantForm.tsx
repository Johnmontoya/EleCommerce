import React, { useState } from "react";
import { BiPlus, BiTag, BiX } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface VariantFormProps {
  watch: any;
  setValue: any;
  errors: any;
}

const VariantForm: React.FC<VariantFormProps> = ({ watch, setValue, errors }) => {
  const [newVariantName, setNewVariantName] = useState<string>("");
  const [newVariantOptions, setNewVariantOptions] = useState<{ [key: number]: string }>({});

  const variants = watch('variants') || [];

  const addVariant = () => {
    if (newVariantName.trim()) {
      setValue('variants', [
        ...variants,
        { name: newVariantName.trim(), options: [] }
      ], { shouldValidate: true });
      setNewVariantName("");
    }
  };

  const addVariantOption = (variantIndex: number) => {
    const optionValue = newVariantOptions[variantIndex];
    if (optionValue && optionValue.trim()) {
      const updatedVariants = [...variants];
      updatedVariants[variantIndex].options.push(optionValue.trim());
      setValue('variants', updatedVariants, { shouldValidate: true });
      setNewVariantOptions({ ...newVariantOptions, [variantIndex]: "" });
    }
  };

  const removeVariant = (index: number) => {
    setValue('variants', variants.filter((_: any, i: number) => i !== index), { shouldValidate: true });
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter(
      (_: any, i: number) => i !== optionIndex
    );
    setValue('variants', updatedVariants, { shouldValidate: true });
  };

  const handleOptionKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, variantIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addVariantOption(variantIndex);
    }
  };

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addVariant();
              }
            }}
            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Nombre de variante (Ej: Color, Talla)"
          />
          <ButtonAction
            onClick={addVariant}
            variant="primary"
            type="button"
            text="Agregar"
          >
            <BiPlus size={18} />
          </ButtonAction>
        </div>

        {errors.variants && (
          <p className="text-red-500 text-sm">{errors.variants.message}</p>
        )}

        {variants.map((variant: any, variantIndex: number) => (
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
                value={newVariantOptions[variantIndex] || ""}
                onChange={(e) => setNewVariantOptions({
                  ...newVariantOptions,
                  [variantIndex]: e.target.value
                })}
                onKeyPress={(e) => handleOptionKeyPress(e, variantIndex)}
                className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
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

            {variant.options.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option: any, optionIndex: number) => (
                  <span
                    key={optionIndex}
                    className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={() => removeVariantOption(variantIndex, optionIndex)}
                      className="hover:text-cyan-300 transition-colors"
                    >
                      <BiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {errors.variants?.[variantIndex]?.options && (
              <p className="text-red-500 text-xs mt-2">
                {errors.variants[variantIndex]?.options?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantForm;