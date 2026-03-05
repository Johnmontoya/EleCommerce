interface StatsProps {
    stats: any
    isAdmin: boolean
}
const StatsInfo: React.FC<StatsProps> = ({ stats, isAdmin }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 font-mono">
            <div className="w-36 md:w-full border border-[#00f0ff] bg-[#00f0ff]/5 p-4 relative group hover:bg-[#00f0ff]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <p className="text-[#00f0ff] text-[9px] mb-1 uppercase tracking-widest">[TOTAL_REGISTROS]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#00f0ff]">{stats.total}</p>
            </div>
            <div className="w-36 md:w-full border border-[#ffaa00] bg-[#ffaa00]/5 p-4 relative group hover:bg-[#ffaa00]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ffaa00] opacity-50" />
                <p className="text-[#ffaa00] text-[9px] mb-1 uppercase tracking-widest">[PENDIENTE]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#ffaa00]">{stats.pending}</p>
            </div>
            <div className="w-36 md:w-full border border-[#00ffaa] bg-[#00ffaa]/5 p-4 relative group hover:bg-[#00ffaa]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ffaa] opacity-50" />
                <p className="text-[#00ffaa] text-[9px] mb-1 uppercase tracking-widest">[CONFIRMADO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#00ffaa]">{stats.confirmed}</p>
            </div>
            <div className="w-36 md:w-full border border-[#e4ff00] bg-[#e4ff00]/5 p-4 relative group hover:bg-[#e4ff00]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e4ff00] opacity-50" />
                <p className="text-[#e4ff00] text-[9px] mb-1 uppercase tracking-widest">[PROCESANDO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#e4ff00]">{stats.processing}</p>
            </div>
            <div className="w-36 md:w-full border border-[#a200ff] bg-[#a200ff]/5 p-4 relative group hover:bg-[#a200ff]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#a200ff] opacity-50" />
                <p className="text-[#a200ff] text-[9px] mb-1 uppercase tracking-widest">[ENVIADO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#a200ff]">{stats.shipped}</p>
            </div>
            <div className="w-36 md:w-full border border-[#00f0ff] bg-[#00f0ff]/5 p-4 relative group hover:bg-[#00f0ff]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50" />
                <p className="text-[#00f0ff] text-[9px] mb-1 uppercase tracking-widest">[ENTREGADO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#00f0ff]">{stats.delivered}</p>
            </div>
            <div className="w-36 md:w-full border border-[#ff0055] bg-[#ff0055]/5 p-4 relative group hover:bg-[#ff0055]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff0055] opacity-50" />
                <p className="text-[#ff0055] text-[9px] mb-1 uppercase tracking-widest">[CANCELADO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#ff0055]">{stats.cancelled}</p>
            </div>
            <div className="w-36 md:w-full border border-zinc-500 bg-zinc-500/5 p-4 relative group hover:bg-zinc-500/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500 opacity-50" />
                <p className="text-zinc-400 text-[9px] mb-1 uppercase tracking-widest">[REEMBOLSADO]</p>
                <p className="text-2xl font-bold text-white [text-shadow:_0_0_8px_#71717a]">{stats.refunded}</p>
            </div>
            <div className="w-36 md:w-full border border-[#e4ff00] bg-[#e4ff00]/5 p-4 relative group hover:bg-[#e4ff00]/10 transition-colors">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#e4ff00] opacity-50" />
                <p className="text-[#e4ff00] text-[9px] mb-1 uppercase tracking-widest">{isAdmin ? "[INGRESOS]" : "[GASTOS]"}</p>
                <p className="text-lg font-bold text-white [text-shadow:_0_0_8px_#e4ff00]">
                    ${stats.totalRevenue.toFixed(0)}
                </p>
            </div>
        </div>
    );
};

export default StatsInfo;