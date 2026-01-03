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
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 my-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Filter Button */}
                <ButtonAction
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    text="Filtros"
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${showFilters
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-200 hover:bg-slate-600"
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
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
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