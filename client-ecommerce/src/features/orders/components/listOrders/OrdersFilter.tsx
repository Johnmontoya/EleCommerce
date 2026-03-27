import { BiExport, BiFilter, BiSearch } from "react-icons/bi";
import { useNotifyQueueSystem } from "../../hook/mutation/useOrderMutation";
import type { OrderExport } from "../../types/order.types";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

interface OrdersProps {
    ordersExport?: OrderExport[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    startDate?: string;
    setStartDate?: (date: string) => void;
    endDate?: string;
    setEndDate?: (date: string) => void;
}

const OrdersFilter: React.FC<OrdersProps> = ({
    ordersExport,
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filterStatus,
    setFilterStatus,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) => {
    const { mutateAsync: notifyQueueSystem } = useNotifyQueueSystem();
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

    const handleExport = () => {
        if (!ordersExport) return;
        SweetAlertas.OnDialogExport({
            message: "¿Estás seguro de que quieres exportar los datos?",
            onConfirm: () => { notifyQueueSystem(ordersExport) },
            onCancel: () => { },
        });
    };

    return (
        <div className="w-72 sm:w-full bg-black border border-zinc-800 p-4 mb-6 relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-600 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-600 opacity-50 pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-4 relative z-10">
                {/* Search */}
                <div className="flex-1 relative">
                    <BiSearch
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="[BUSCAR_ID_DE_SEGUIMIENTO]"
                        className="w-full bg-transparent border border-zinc-700 text-[#00f0ff] placeholder-zinc-600 px-4 py-3 pl-10 rounded-none outline-none focus:border-[#00f0ff] transition-all font-mono uppercase tracking-widest text-[10px]"
                    />
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-none font-mono font-bold uppercase tracking-widest text-[10px] transition-all border ${showFilters
                        ? "bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff]"
                        : "bg-black border-zinc-700 text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]"
                        }`}
                >
                    <BiFilter size={16} />
                    [FILTROS]
                </button>

                {/* Export Button */}
                {ordersExport && (
                    <button
                        onClick={() => { handleExport() }}
                        className="flex items-center gap-2 bg-black border border-zinc-700 text-zinc-400 hover:text-white hover:border-white hover:bg-zinc-800 px-6 py-3 rounded-none font-mono font-bold uppercase tracking-widest text-[10px] transition-all">
                        <BiExport size={16} />
                        [EXPORTAR_DATOS]
                    </button>
                )}
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <div className="mt-4 pt-4 border-t border-zinc-800 relative z-10">
                    <label className="block text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-2">
                        [FILTRAR_POR_ESTADO]
                    </label>
                    <select
                        value={filterStatus === null ? "all" : String(filterStatus)}
                        onChange={handleStatusChange}
                        className="w-full md:w-64 bg-black border border-zinc-700 text-[#00f0ff] px-4 py-2 rounded-none outline-none focus:border-[#00f0ff] cursor-pointer font-mono uppercase tracking-widest text-[10px]"
                    >
                        <option value="all">[TODOS_LOS_ESTADOS]</option>
                        <option value="PENDING">[PENDIENTE]</option>
                        <option value="CONFIRMED">[CONFIRMADO]</option>
                        <option value="PROCESSING">[PROCESANDO]</option>
                        <option value="SHIPPED">[ENVIADO]</option>
                        <option value="DELIVERED">[ENTREGADO]</option>
                        <option value="CANCELLED">[CANCELADO]</option>
                        <option value="REFUNDED">[REEMBOLSADO]</option>
                    </select>

                    {setStartDate && setEndDate && (
                        <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <div className="flex-1">
                                <label className="block text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-2">
                                    [FECHA_INICIO]
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-black border border-zinc-700 text-[#00f0ff] px-4 py-2 rounded-none outline-none focus:border-[#00f0ff] font-mono uppercase tracking-widest text-[10px]"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-2">
                                    [FECHA_FIN]
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-black border border-zinc-700 text-[#00f0ff] px-4 py-2 rounded-none outline-none focus:border-[#00f0ff] font-mono uppercase tracking-widest text-[10px]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrdersFilter;