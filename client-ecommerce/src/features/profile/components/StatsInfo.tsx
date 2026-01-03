import { BiHeart, BiPackage } from "react-icons/bi";

interface Stats {
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
    reviewsWritten: number;
}

const StatsInfo: React.FC<{ stats: Stats }> = ({ stats }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <BiPackage className="text-cyan-400" size={24} />
                    <span className="text-2xl font-bold text-slate-100">
                        {stats.totalOrders}
                    </span>
                </div>
                <p className="text-slate-400 text-sm">Pedidos Totales</p>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 text-xl">💰</span>
                    <span className="text-2xl font-bold text-slate-100">
                        ${stats.totalSpent}
                    </span>
                </div>
                <p className="text-slate-400 text-sm">Total Gastado</p>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <BiHeart className="text-cyan-400" size={24} />
                    <span className="text-2xl font-bold text-slate-100">
                        {stats.wishlistItems}
                    </span>
                </div>
                <p className="text-slate-400 text-sm">Lista de Deseos</p>
            </div>

            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 text-xl">⭐</span>
                    <span className="text-2xl font-bold text-slate-100">
                        {stats.reviewsWritten}
                    </span>
                </div>
                <p className="text-slate-400 text-sm">Reviews Escritas</p>
            </div>
        </div>
    );
};

export default StatsInfo;