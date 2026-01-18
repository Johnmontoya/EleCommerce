import { BiFilter } from "react-icons/bi";
import ButtonAction from "../../../../shared/ui/ButtonAction";

interface CategoryFilterProps {
    showFilters: boolean;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean | null;
    setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    showFilters,
    setShowFilters,
    isActive,
    setIsActive,
}) => {
    const handleActiveUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        if (value === "all") {
            setIsActive(null); // O el valor que uses para "Todos" (ej. "")
        } else {
            // Convertimos el string "true" o "false" a booleano real
            setIsActive(value === "true");
        }
    };
    return (
        <div className="dash-search-border dark:dash-search-border border border-slate-700 rounded-2xl p-4 backdrop-blur-sm my-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Filter Button */}
                <ButtonAction
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    text="Filtros"
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${showFilters
                        ? "bg-slate-700/30 border border-slate-500 text-slate-200 hover:bg-slate-800 text-white"
                        : "bg-slate-900/30 border border-slate-500 text-slate-200 hover:bg-slate-800 text-white"
                        }`}
                >
                    <BiFilter size={20} />
                </ButtonAction>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-semibold mb-2">
                            Filtrar por Estado
                        </label>
                        <select
                            value={isActive === null ? "all" : String(isActive)}
                            onChange={handleActiveUserChange}
                            className="w-full bg-slate-700 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="true">Activos</option>
                            <option value="false">Inactivos</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;