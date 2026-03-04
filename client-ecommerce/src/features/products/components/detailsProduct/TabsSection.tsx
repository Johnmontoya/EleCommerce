import { useState } from "react";
import type { Product } from "../../types/product.types";
import SpecsContent from "./SpectContent";
import ReviewsContent from "./ReviewsContent";

type TabType = "descripcion" | "specs" | "reviews";

interface TabsSectionProps {
  product: Product;
}

const TabsSection = ({ product }: TabsSectionProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("descripcion");

  const tabContent: Record<TabType, { title: string; content: React.ReactNode }> = {
    descripcion: {
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
    <div className="w-full max-w-7xl mx-auto mt-16 px-4 sm:px-6 pb-16 font-mono">
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-start items-start gap-1 sm:gap-2 mb-0 border-b border-zinc-800">
        {(["descripcion", "specs", "reviews"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all relative ${activeTab === tab
              ? "text-[#00f0ff] bg-[#050505] border-t border-l border-r border-zinc-800 border-b-transparent top-[1px]"
              : "text-zinc-500 hover:text-[#00f0ff] bg-transparent border-t border-l border-r border-transparent hover:bg-zinc-900"
              }`}
          >
            {activeTab === tab && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff]" />
            )}
            {tab === "reviews" ? `REVIEWS [${product.reviewsCount}]` : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#050505] border border-zinc-800 border-t-transparent p-6 sm:p-8 relative">
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-50" />

        <h2 className="text-[#e4ff00] text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#e4ff00] animate-pulse"></span>
          {tabContent[activeTab].title} //
        </h2>

        <div className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line border-l border-zinc-900 pl-4 border-dashed">
          {tabContent[activeTab].content}
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
