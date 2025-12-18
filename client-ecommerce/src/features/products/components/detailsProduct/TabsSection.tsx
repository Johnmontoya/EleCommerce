import { useState } from "react";
import type { Product } from "../../types/product.types";
import SpecsContent from "./SpectContent";
import ReviewsContent from "./ReviewsContent";

type TabType = "description" | "specs" | "reviews";

interface TabsSectionProps {
    product: Product;
}

const TabsSection = ({ product }: TabsSectionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabContent: Record<TabType, { title: string; content: React.ReactNode }> = {
    description: {
      title: "Descripción del Producto",
      content: `${product.description}`,
    },
    specs: {
      title: "Especificaciones Técnicas",
      content: <SpecsContent product={product} />,
    },
    reviews: {
      title: "Opiniones de Clientes",
      content: <ReviewsContent product={product} />
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
          Reviews {product.reviewsCount}
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800/50 border border-slate-700 shadow-xl rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          {tabContent[activeTab].title}
        </h2>
        <div className="text-slate-300 leading-relaxed whitespace-pre-line">
          {tabContent[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
