import React, { useState } from "react";
import { BiPlus, BiTag, BiX } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface TagsFormProps {
  watch: any;
  setValue: any;
  errors: any;
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
    setValue('tags', tags.filter((_: any, i: number) => i !== index), { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <BiTag size={20} className="text-cyan-400" />
        Etiquetas
      </h2>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
            placeholder="Agregar etiqueta"
          />
          <ButtonAction
            variant="primary"
            text=""
            type="button"
            onClick={addTag}
          >
            <BiPlus size={16} />
          </ButtonAction>
        </div>

        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: any, index: number) => (
              <span
                key={index}
                className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="hover:bg-slate-700 rounded-full transition-colors"
                >
                  <BiX size={16} />
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