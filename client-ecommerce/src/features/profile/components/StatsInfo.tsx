import { BiHeart, BiPackage } from "react-icons/bi";

interface Stats {
    totalOrders: number;
    totalSpent: number;
    wishlistItems: number;
    reviewsWritten: number;
}

const StatsInfo: React.FC<{ stats: Stats }> = ({ stats }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-mono">
            {/* Total Orders */}
            <div className="bg-[#050505] border border-zinc-800 p-4 relative group hover:border-[#00f0ff] transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#00f0ff] transition-colors" />
                <div className="flex items-center justify-between mb-2">
                    <BiPackage className="text-[#00f0ff]" size={24} />
                    <span className="text-2xl font-black text-white tracking-widest">
                        {stats.totalOrders}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                    [TOTAL_PEDIDOS]
                </p>
            </div>

            {/* Total Spent */}
            <div className="bg-[#050505] border border-zinc-800 p-4 relative group hover:border-[#e4ff00] transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#e4ff00] transition-colors" />
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#e4ff00] font-bold text-xl">$</span>
                    <span className="text-2xl font-black text-white tracking-widest">
                        {stats.totalSpent.toFixed(2)}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                    [TOTAL_GASTADO]
                </p>
            </div>

            {/* Wishlist Items */}
            <div className="bg-[#050505] border border-zinc-800 p-4 relative group hover:border-[#ff0055] transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#ff0055] transition-colors" />
                <div className="flex items-center justify-between mb-2">
                    <BiHeart className="text-[#ff0055]" size={24} />
                    <span className="text-2xl font-black text-white tracking-widest">
                        {stats.wishlistItems}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                    [ARTICULOS_EN_LISTA_DE_DESEOS]
                </p>
            </div>

            {/* Reviews Written */}
            <div className="bg-[#050505] border border-zinc-800 p-4 relative group hover:border-[#00ffaa] transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#00ffaa] transition-colors" />
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[#00ffaa] font-bold text-xl">★</span>
                    <span className="text-2xl font-black text-white tracking-widest">
                        {stats.reviewsWritten}
                    </span>
                </div>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                    [RESEÑAS_PUBLICADAS]
                </p>
            </div>
        </div>
    );
};

export default StatsInfo;