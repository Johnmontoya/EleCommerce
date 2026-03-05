import React, { useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import type { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ProductSchemaType } from "../../types/product.schema";

interface TagsFormProps {
  watch: UseFormWatch<ProductSchemaType>;
  setValue: UseFormSetValue<ProductSchemaType>;
  errors: FieldErrors<ProductSchemaType>;
}

const TagsForm: React.FC<TagsFormProps> = ({ watch, setValue, errors }) => {
  const [newTag, setNewTag] = useState<string>("");
  const tags = watch('tags') || [];

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setValue('tags', [...tags, newTag.trim()], { shouldValidate: true });
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setValue('tags', tags.filter((_: string, i: number) => i !== index), { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="w-72 sm:w-full bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [ETIQUETAS_DE_PRODUCTO]
      </h2>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
            placeholder="[ADD_TAG]"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all flex justify-center items-center px-4 py-3 min-w-[48px]"
          >
            <BiPlus size={16} />
          </button>
        </div>

        {errors.tags && (
          <p className="text-[#ff0055] text-[10px] mt-1 font-bold tracking-widest uppercase">[{errors.tags.message as string}]</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="hover:bg-[#ff0055] hover:text-white transition-colors rounded-none p-0.5 flex items-center justify-center"
                >
                  <BiX size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsForm;