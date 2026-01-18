import React, { useState } from "react";
import { BiPlus, BiTag, BiX } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface TagsProps {
  tags: string[];
}

interface CardTagsProps {
  product: TagsProps;
  onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
  getFieldsError: (fieldName: string) => string | undefined;
}

const TagsInformation: React.FC<CardTagsProps> = ({
  product,
  setCreateData,
  getFieldsError
}) => {
  const [newTag, setNewTag] = useState<string>("");
  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setCreateData({ ...product, tags: [...product.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setCreateData({
      ...product,
      tags: product.tags.filter((_, i) => i !== index),
    });
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
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
            className="flex-1 bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-3 py-2 rounded-lg outline-none focus:border-cyan-400 transition-all text-sm"
            placeholder="Agregar etiqueta"
          />
          <ButtonAction
            variant="primary"
            text=""
            onClick={addTag}
          >
            <BiPlus size={16} />
          </ButtonAction>
        </div>
        <div className="text-red-500 text-sm mt-0">
          {getFieldsError?.("tags")}
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              {tag}
              <ButtonAction className={"bg-slate-700 rounded-full w-4 p-0! h-4"} children={<BiX size={14} />} onClick={() => removeTag(index)} text={""} variant="danger" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsInformation;
