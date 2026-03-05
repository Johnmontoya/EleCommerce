import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import type { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";
import type { Variant } from "../../types/product.types";
interface VariantFormProps {
  watch: UseFormWatch<ProductSchemaType>;
  setValue: UseFormSetValue<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
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
    setValue('variants', variants.filter((_: Variant, i: number) => i !== index), { shouldValidate: true });
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options = updatedVariants[variantIndex].options.filter(
      (_: string, i: number) => i !== optionIndex
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
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [VARIANTES_DE_PRODUCTO]
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
            className="flex-1 bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
            placeholder="[TIPO_COLOR/TAMAÑO...]"
          />
          <button
            onClick={addVariant}
            type="button"
            className="bg-transparent border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black px-4 py-2 flex items-center gap-2 transition-all font-bold text-[10px] tracking-widest uppercase"
          >
            <BiPlus size={16} /> [ADD]
          </button>
        </div>

        {errors.variants && (
          <p className="text-[#ff0055] text-[10px] uppercase font-bold tracking-widest">[{errors.variants.message as string}]</p>
        )}

        {variants.map((variant: Variant, variantIndex: number) => (
          <div
            key={variantIndex}
            className="bg-black border border-zinc-800 p-4 relative"
          >
            <div className="absolute top-2 left-2 w-1 h-1 bg-[#ff0055]"></div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-[#e4ff00] text-xs font-bold tracking-[0.2em] uppercase">{variant.name}</h3>
              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="text-zinc-500 hover:text-[#ff0055] transition-colors"
                title="[ELIMINAR_VARIANT]"
              >
                <BsTrash2 size={16} />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newVariantOptions[variantIndex] || ""}
                onChange={(e) => setNewVariantOptions({
                  ...newVariantOptions,
                  [variantIndex]: e.target.value
                })}
                onKeyPress={(e) => handleOptionKeyPress(e, variantIndex)}
                className="flex-1 bg-black border border-zinc-800 border-dashed text-white placeholder-zinc-700 px-3 py-2 rounded-none outline-none focus:border-[#e4ff00] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
                placeholder="[VALOR_DE_LA_OPCION]"
              />
              <button
                type="button"
                onClick={() => addVariantOption(variantIndex)}
                className="bg-transparent border border-zinc-700 text-zinc-400 hover:border-[#e4ff00] hover:text-[#e4ff00] px-3 py-2 transition-all"
                title="[INSERTAR_OPCION]"
              >
                <BiPlus size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {variant.options.map((option: string, optionIndex: number) => (
                <span
                  key={optionIndex}
                  className="bg-transparent border border-[#00f0ff]/30 text-[#00f0ff] px-2 py-1 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 group"
                >
                  {option}
                  <button
                    type="button"
                    onClick={() => removeVariantOption(variantIndex, optionIndex)}
                    className="text-zinc-500 group-hover:text-[#ff0055] transition-colors"
                  >
                    <BiX size={14} />
                  </button>
                </span>
              ))}
            </div>

            {(errors.variants as unknown as Array<{ options?: { message?: string } } | undefined>)?.[variantIndex]?.options && (
              <p className="text-[#ff0055] text-[10px] mt-2 font-bold tracking-widest uppercase">
                {(errors.variants as unknown as Array<{ options?: { message?: string } } | undefined>)?.[variantIndex]?.options?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantForm;