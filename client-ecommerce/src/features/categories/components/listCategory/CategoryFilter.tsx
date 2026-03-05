import { BiFilter } from "react-icons/bi";

interface CategoryFilterProps {
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    isActive: boolean | null;
    setIsActive: (active: boolean | null) => void;
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
        <div className="w-72 sm:w-full border border-zinc-800 bg-[#050505] p-6 my-6 font-mono">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-3 font-bold tracking-widest text-xs uppercase border transition-all ${showFilters
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                        : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500"
                        }`}
                >
                    <BiFilter size={18} />
                    [FILTROS]
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-zinc-800 border-dashed grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800 mb-2">
                            [ESTADO_FILTROS]
                        </label>
                        <select
                            value={isActive === null ? "all" : String(isActive)}
                            onChange={handleActiveUserChange}
                            className="w-full bg-black border border-zinc-800 text-white uppercase tracking-widest text-xs px-4 py-3 outline-none focus:border-[#00f0ff] appearance-none"
                        >
                            <option value="all">[TODOS_ESTADOS]</option>
                            <option value="true">[ESTADO_ACTIVO]</option>
                            <option value="false">[ESTADO_INACTIVO]</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;