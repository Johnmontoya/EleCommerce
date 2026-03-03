import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { useCategories } from "../../../categories/hook/queries/useCategory";
import type { Category } from "../../../categories/type/category.types";

interface CardCategoryListProps {
  selectedCategory?: string;
  onSelectCategory: (category: Category | undefined) => void;
}

const CardCategoryList: React.FC<CardCategoryListProps> = ({ selectedCategory, onSelectCategory }) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <LoadingFallback />

  return (
    <div className="bg-[#050505] border border-zinc-800 p-6 relative">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

      <h3 className="text-xs font-bold text-[#e4ff00] uppercase tracking-[0.2em] mb-6">
        SYS_CATEGORIES //
      </h3>

      <ul className="space-y-2 h-96 overflow-y-auto pr-2 custom-scrollbar">
        {/* Opción "Todas" */}
        <li>
          <button
            onClick={() => onSelectCategory(undefined)}
            className={`w-full text-left px-4 py-3 border transition-all text-xs font-mono tracking-widest uppercase flex items-center ${!selectedCategory
              ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
              : "bg-black border-zinc-800 text-zinc-500 hover:text-[#00f0ff] hover:border-zinc-600"
              }`}
          >
            <span className="mr-2">{!selectedCategory ? "■" : "□"}</span> ALL_CATEGORIES
          </button>
        </li>

        {/* Categorías dinámicas */}
        {categories && categories.length > 0 ? (
          categories.map((category: Category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-3 border transition-all text-xs font-mono tracking-widest uppercase flex items-center ${selectedCategory === category.id
                  ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                  : "bg-black border-zinc-800 text-zinc-500 hover:text-[#00f0ff] hover:border-zinc-600"
                  }`}
              >
                <span className="mr-2">{selectedCategory === category.id ? "■" : "□"}</span> {category.name}
              </button>
            </li>
          ))
        ) : (
          <li className="text-zinc-600 font-mono text-xs px-4 py-3 bg-black border border-zinc-900 border-dashed">
            NO_CATEGORIES_FOUND
          </li>
        )}
      </ul>
    </div>
  );
};

export default CardCategoryList;
