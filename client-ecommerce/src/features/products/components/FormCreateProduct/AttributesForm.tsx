import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";

interface AttributesFormProps {
  watch: any;
  setValue: any;
  errors: any;
}

const AttributesForm: React.FC<AttributesFormProps> = ({ watch, setValue, errors }) => {
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");

  const attributes = watch('attributes') || [];

  const addAttribute = () => {
    if (newAttributeName.trim() && newAttributeValue.trim()) {
      setValue('attributes', [
        ...attributes,
        { name: newAttributeName.trim(), value: newAttributeValue.trim() }
      ], { shouldValidate: true });
      setNewAttributeName("");
      setNewAttributeValue("");
    }
  };

  const removeAttribute = (index: number) => {
    setValue('attributes', attributes.filter((_: any, i: number) => i !== index), { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAttribute();
    }
  };

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative font-mono mt-4">
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
      <h2 className="text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#00f0ff] inline-block"></span>
        [PRODUCTOS_ATRIBUTO]
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
            placeholder="[NAME_EG._BATTERY]"
          />
          <input
            type="text"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-black border border-zinc-800 text-white placeholder-zinc-700 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] transition-all text-[10px] font-bold tracking-[0.2em] uppercase"
            placeholder="[VALUE_EG._30H]"
          />
        </div>

        <button
          type="button"
          onClick={addAttribute}
          className="w-full bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all flex justify-center items-center gap-2 px-4 py-3 font-bold text-[10px] tracking-widest uppercase"
        >
          <BiPlus size={16} /> [AGREGAR_ATRIBUTO]
        </button>

        {errors.attributes && (
          <p className="text-[#ff0055] text-[10px] uppercase tracking-widest font-bold">[{errors.attributes.message}]</p>
        )}

        {attributes.length > 0 && (
          <div className="space-y-2 mt-4">
            {attributes.map((attr: any, index: number) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 p-3 flex items-center justify-between relative group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff]/50 group-hover:bg-[#00f0ff] transition-colors"></div>
                <div className="pl-3 w-full grid grid-cols-2 gap-2">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">{attr.name}</p>
                  <p className="text-[#00f0ff] text-[10px] uppercase tracking-widest font-bold">{attr.value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="text-zinc-600 hover:text-[#ff0055] transition-colors ml-4"
                  title="[ELIMINAR_ATRIBUTO]"
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

export default AttributesForm;