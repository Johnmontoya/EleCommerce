import { useState } from "react";
import type { TabContent } from "../../types/product.types";

type TabType = "description" | "specs" | "reviews";

const TabsSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabContent: Record<TabType, TabContent> = {
    description: {
      title: "Descripción del Producto",
      content: `Vestibulum condimentum imperdiet velit nec ornare. Nullam lobortis
            urna posuere quam porta consequat. Donec commodo diam lectus, sit
            amet tempor dolor scelerisque eget. Vestibulum at lectus dui.
            Maecenas consectetur tempor ipsum non porttitor. Cras accumsan
            mattis aliquam. Fusce eleifend maximus elit facilisis condimentum.
            Mauris non risus sed ligula convallis fermentum.
            
            Quisque eu purus nunc. Ut eget ligula ac lorem laoreet scelerisque
            in ut nulla. Quisque volutpat elit eget tellus pharetra, vel
            sollicitudin velit scelerisque. Vivamus ac libero eu nunc congue
            malesuada eu vitae est.`,
    },
    specs: {
      title: "Especificaciones Técnicas",
      content: `Material: Mesh sintético de alta calidad con soporte adicional.
            Suela: Goma duradera con tecnología de amortiguación Nike Air.
            Peso: 280g (talla 42).
            Colores disponibles: Negro, Blanco, Gris, Azul.
            Tallas: 38-46.
            Uso recomendado: Running, entrenamiento deportivo, uso casual.`,
    },
    reviews: {
      title: "Opiniones de Clientes (150)",
      content: `⭐⭐⭐⭐⭐ "Excelentes zapatos, muy cómodos para correr largas distancias." - María G.
            
            ⭐⭐⭐⭐ "Buena calidad pero un poco ajustados al principio." - Carlos R.
            
            ⭐⭐⭐⭐⭐ "Los mejores zapatos deportivos que he tenido. Totalmente recomendados." - Ana L.
            
            ⭐⭐⭐⭐ "Relación calidad-precio excelente. Los uso todos los días." - Pedro M.`,
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 px-6 pb-16">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-start items-start gap-2 px-3 mb-0">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
            activeTab === "description"
              ? "bg-cyan-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Descripción
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
            activeTab === "specs"
              ? "bg-cyan-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Especificaciones
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-6 py-3 font-semibold rounded-t-lg transition-all ${
            activeTab === "reviews"
              ? "bg-cyan-500 text-white shadow-lg"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Reviews (150)
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/50 border border-slate-700 shadow-xl rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          {tabContent[activeTab].title}
        </h2>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
          {tabContent[activeTab].content}
        </p>
      </div>
    </div>
  );
};

export default TabsSection;
