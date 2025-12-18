import LoadingFallback from "../../../../shared/ui/LoadingFallback";
import { useCategories } from "../../hook/queries/useProduct";

interface CardCategoryListProps {
  selectedCategory?: string;
  onSelectCategory: (category: string | undefined) => void;
}

const CardCategoryList: React.FC<CardCategoryListProps> = ({ selectedCategory, onSelectCategory }) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <LoadingFallback />

  return (
    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-slate-100 mb-4">Categorías</h3>

      <ul className="space-y-2">
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
          categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
