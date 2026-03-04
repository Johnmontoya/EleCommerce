import { BiExport, BiFilter, BiSearch } from "react-icons/bi"


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
        <div className="bg-black border border-zinc-800 p-6 my-6 relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative py-1">
                    <BiSearch
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f0ff]"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="[SEARCH_SYS_ARCHIVES...]"
                        className="w-full bg-[#050505] border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 pl-10 rounded-none outline-none focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all font-mono text-[10px] uppercase tracking-widest"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all text-[10px] uppercase tracking-widest border ${showFilters
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                        : "bg-transparent border-zinc-700 text-zinc-400 hover:border-[#00f0ff] hover:text-[#00f0ff]"
                        }`}
                >
                    <BiFilter size={16} />
                    [FILTERS]
                </button>

                {/* Export Button */}
                <button
                    onClick={() => { }}
                    className="flex items-center justify-center gap-2 bg-transparent border border-zinc-700 text-zinc-400 hover:border-[#e4ff00] hover:text-[#e4ff00] px-6 py-3 font-bold transition-all text-[10px] uppercase tracking-widest">
                    <BiExport size={16} />
                    [EXPORT_DATA]
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                            [FILTER_BY_ROLE]
                        </label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="w-full bg-black border border-zinc-800 text-zinc-300 px-4 py-2 rounded-none outline-none focus:border-[#e4ff00] cursor-pointer font-mono text-[10px] uppercase tracking-widest"
                        >
                            <option value="all">[ALL_ROLES]</option>
                            <option value="SUPER_ADMIN">[SUPER_ADMIN]</option>
                            <option value="ADMIN">[ADMIN]</option>
                            <option value="USER">[USER]</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                            [FILTER_BY_STATUS]
                        </label>
                        <select
                            value={isActive === null ? "all" : String(isActive)}
                            onChange={handleActiveUserChange}
                            className="w-full bg-black border border-zinc-800 text-zinc-300 px-4 py-2 rounded-none outline-none focus:border-[#e4ff00] cursor-pointer font-mono text-[10px] uppercase tracking-widest"
                        >
                            <option value="all">[ALL_STATUSES]</option>
                            <option value="true">[STATUS:ACTIVE]</option>
                            <option value="false">[STATUS:INACTIVE]</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserFilters