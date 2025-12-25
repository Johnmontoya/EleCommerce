import { BiExport, BiFilter, BiSearch } from "react-icons/bi"
import ButtonAction from "../../../../shared/ui/ButtonAction"

interface UserFiltersProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    filterRole: string;
    setFilterRole: React.Dispatch<React.SetStateAction<string>>;
    showFilters: boolean;
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
    isActive: boolean | null;
    setIsActive: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const UserFilters: React.FC<UserFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    filterRole,
    setFilterRole,
    showFilters,
    setShowFilters,
    isActive,
    setIsActive
}) => {
    const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchTerm(e.currentTarget.value);
    };

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
                {/* Search */}
                <div className="flex-1 relative py-1">
                    <BiSearch
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre, email o username..."
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                </div>

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

                {/* Export Button */}
                <ButtonAction
                    variant="outline"
                    text="Exportar"
                    onClick={() => { }}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-semibold transition-all">
                    <BiExport size={20} />
                </ButtonAction>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-semibold mb-2">
                            Filtrar por Rol
                        </label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                        >
                            <option value="all">Todos los roles</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>

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
    )
}

export default UserFilters