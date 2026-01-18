interface StatsProps {
    stats: any
    isAdmin: boolean
}
const StatsInfo: React.FC<StatsProps> = ({ stats, isAdmin }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            <div className="card-total border-2 border-slate-700 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-slate-100 text-xs mb-1">Total</p>
                <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
            </div>
            <div className="card-pending border-2 border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-yellow-100 text-xs mb-1">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-100">{stats.pending}</p>
            </div>
            <div className="card-confirmed border-2 border-emerald-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-emerald-100 text-xs mb-1">Confirmados</p>
                <p className="text-2xl font-bold text-emerald-100">{stats.confirmed}</p>
            </div>
            <div className="card-processing border-2 border-blue-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-slate-100 text-xs mb-1">Procesando</p>
                <p className="text-2xl font-bold text-slate-100">{stats.processing}</p>
            </div>
            <div className="card-shipped border-2 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-purple-100 text-xs mb-1">Enviados</p>
                <p className="text-2xl font-bold text-purple-100">{stats.shipped}</p>
            </div>
            <div className="card-delivered border-2 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-green-100 text-xs mb-1">Entregados</p>
                <p className="text-2xl font-bold text-green-100">{stats.delivered}</p>
            </div>
            <div className="card-cancelled border-2 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-red-100 text-xs mb-1">Cancelados</p>
                <p className="text-2xl font-bold text-red-100">{stats.cancelled}</p>
            </div>
            <div className="card-refunded/10 border-2 border-slate-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-slate-100 text-xs mb-1">Reembolsados</p>
                <p className="text-2xl font-bold text-slate-100">{stats.refunded}</p>
            </div>
            <div className="card-gastos border-2 border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-cyan-100 text-xs mb-1">{isAdmin ? "Ganancias" : "Gastos"}</p>
                <p className="text-lg font-bold text-cyan-100">
                    ${stats.totalRevenue.toFixed(0)}
                </p>
            </div>
        </div>
    );
};

export default StatsInfo;