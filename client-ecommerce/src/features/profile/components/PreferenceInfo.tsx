
interface PreferenceInfoProps {
    activeTab: "overview" | "orders" | "security" | "preferences";
}

const PreferenceInfo = ({ activeTab }: PreferenceInfoProps) => {
    return (
        <>
            {activeTab === "preferences" && (
                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-slate-100 mb-6">
                        Preferencias de Notificaciones
                    </h2>
                    <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                            <div>
                                <p className="text-slate-100 font-semibold">
                                    Notificaciones por Email
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Recibir actualizaciones de pedidos por email
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                            <div>
                                <p className="text-slate-100 font-semibold">
                                    Ofertas y Promociones
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Recibir información sobre ofertas especiales
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                defaultChecked
                                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                            <div>
                                <p className="text-slate-100 font-semibold">
                                    Newsletter Semanal
                                </p>
                                <p className="text-slate-400 text-sm">
                                    Recibir resumen semanal de novedades
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            )}
        </>
    );
};

export default PreferenceInfo;