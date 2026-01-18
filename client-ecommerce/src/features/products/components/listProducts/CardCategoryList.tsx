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
    <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Categorías</h3>

      <ul className="space-y-2 h-96 overflow-y-auto">
        {/* Opción "Todas" */}
        <li>
          <button
            onClick={() => onSelectCategory(undefined)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${!selectedCategory
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              : "text-slate-300 hover:bg-slate-700"
              }`}
          >
            Todas las categorías
          </button>
        </li>

        {/* Categorías dinámicas */}
        {categories && categories.length > 0 ? (
          categories.map((category: Category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                {category.name}
              </button>
            </li>
          ))
        ) : (
          <li className="text-slate-400 text-sm px-4 py-2">
            No hay categorías disponibles
          </li>
        )}
      </ul>
    </div>
  );
};

export default CardCategoryList;
