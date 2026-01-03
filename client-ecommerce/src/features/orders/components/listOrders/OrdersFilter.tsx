import { BiExport, BiFilter, BiSearch } from "react-icons/bi";

interface OrdersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
}

const OrdersFilter: React.FC<OrdersProps> = ({
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filterStatus,
    setFilterStatus,
}) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        if (value === "all") {
            setFilterStatus("all"); // O el valor que uses para "Todos" (ej. "")
        } else {
            // Convertimos el string "true" o "false" a booleano real
            setFilterStatus(value);
        }
    };
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-4 backdrop-blur-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <BiSearch
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar por número de orden"
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${showFilters
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                        }`}
                >
                    <BiFilter size={20} />
                    Filtros
                </button>

                {/* Export Button */}
                <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3 rounded-lg font-semibold transition-all">
                    <BiExport size={20} />
                    Exportar
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <label className="block text-slate-300 text-sm font-semibold mb-2">
                        Filtrar por Estado
                    </label>
                    <select
                        value={filterStatus === null ? "all" : String(filterStatus)}
                        onChange={handleStatusChange}
                        className="w-full md:w-64 bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-2 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="PENDING">Pendiente</option>
                        <option value="CONFIRMED">Confirmado</option>
                        <option value="PROCESSING">Procesando</option>
                        <option value="SHIPPED">Enviado</option>
                        <option value="DELIVERED">Entregado</option>
                        <option value="CANCELLED">Cancelado</option>
                        <option value="REFUNDED">Reembolsado</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default OrdersFilter;