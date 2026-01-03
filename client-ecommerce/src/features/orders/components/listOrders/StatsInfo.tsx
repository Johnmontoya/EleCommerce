interface StatsProps {
    stats: any
    isAdmin: boolean
}
const StatsInfo: React.FC<StatsProps> = ({ stats, isAdmin }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-slate-400 text-xs mb-1">Total</p>
                <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
            </div>
            <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-yellow-400 text-xs mb-1">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
            </div>
            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-emerald-400 text-xs mb-1">Confirmados</p>
                <p className="text-2xl font-bold text-emerald-400">{stats.confirmed}</p>
            </div>
            <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-blue-400 text-xs mb-1">Procesando</p>
                <p className="text-2xl font-bold text-blue-400">{stats.processing}</p>
            </div>
            <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-purple-400 text-xs mb-1">Enviados</p>
                <p className="text-2xl font-bold text-purple-400">{stats.shipped}</p>
            </div>
            <div className="bg-green-500/10 border-2 border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-green-400 text-xs mb-1">Entregados</p>
                <p className="text-2xl font-bold text-green-400">{stats.delivered}</p>
            </div>
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-red-400 text-xs mb-1">Cancelados</p>
                <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
            </div>
            <div className="bg-slate-500/10 border-2 border-slate-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-slate-400 text-xs mb-1">Reembolsados</p>
                <p className="text-2xl font-bold text-slate-400">{stats.refunded}</p>
            </div>
            <div className="bg-cyan-500/10 border-2 border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-cyan-400 text-xs mb-1">{isAdmin ? "Ganancias" : "Gastos"}</p>
                <p className="text-lg font-bold text-cyan-400">
                    ${stats.totalRevenue.toFixed(0)}
                </p>
            </div>
        </div>
    );
};

export default StatsInfo;