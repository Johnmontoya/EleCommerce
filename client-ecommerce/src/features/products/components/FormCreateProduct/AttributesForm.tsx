import React, { useState } from "react";
import { BiBarChart, BiPlus } from "react-icons/bi";
import { BsTrash2 } from "react-icons/bs";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface Attribute {
  name: string;
  value: string;
}

interface AttributesProps {
  attributes: Attribute[];
}

interface CardAttributesProps {
  product: AttributesProps;
  onChangeCreateData: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setCreateData: React.Dispatch<React.SetStateAction<any>>;
}

const AttributesData: React.FC<CardAttributesProps> = ({
  product,
  setCreateData,
}) => {
  const [newAttributeName, setNewAttributeName] = useState<string>("");
  const [newAttributeValue, setNewAttributeValue] = useState<string>("");

  const addAttribute = () => {
    if (newAttributeName.trim() && newAttributeValue.trim()) {
      setCreateData({
        ...product,
        attributes: [
          ...product.attributes,
          { name: newAttributeName.trim(), value: newAttributeValue.trim() },
        ],
      });
      setNewAttributeName("");
      setNewAttributeValue("");
    }
  };

  const removeAttribute = (index: number) => {
    setCreateData({
      ...product,
      attributes: product.attributes.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
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
            className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Nombre (Ej: Duración de Batería)"
          />
          <input
            type="text"
            value={newAttributeValue}
            onChange={(e) => setNewAttributeValue(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Valor (Ej: 30 horas)"
          />
        </div>
        <ButtonAction
          variant="primary"
          onClick={addAttribute}
          text="Agregar Atributo"
          className="w-full flex justify-center"
        >
          <BiPlus size={18} />
        </ButtonAction>

        {product.attributes.length > 0 && (
          <div className="space-y-2">
            {product.attributes.map((attr, index) => (
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

export default AttributesData;
