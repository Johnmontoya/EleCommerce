import React, { useState } from "react";
import { BiBarChart, BiPlus } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";

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
    <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <BiBarChart size={20} className="text-cyan-400" />
        Atributos
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newAttributeName}
            onChange={(e) => setNewAttributeName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Nombre (Ej: Duración de Batería)"
          />
          <input
            type="text"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Valor (Ej: 30 horas)"
          />
        </div>

        <ButtonAction
          variant="primary"
          type="button"
          onClick={addAttribute}
          text="Agregar Atributo"
          className="w-full flex justify-center"
        >
          <BiPlus size={18} />
        </ButtonAction>

        {errors.attributes && (
          <p className="text-red-500 text-sm">{errors.attributes.message}</p>
        )}

        {attributes.length > 0 && (
          <div className="space-y-2">
            {attributes.map((attr: any, index: number) => (
              <div
                key={index}
                className="bg-slate-700/30 border border-slate-600 rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-slate-400 text-sm">{attr.name}</p>
                  <p className="text-slate-100 font-medium">{attr.value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttribute(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
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