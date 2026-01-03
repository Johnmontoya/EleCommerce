import { BiCalendar, BiHeart, BiMap, BiPackage, BiShield } from "react-icons/bi"
import { MdLanguage, MdVerifiedUser } from "react-icons/md"
import type { User } from "../../auth/types/auth.types";
import ButtonAction from "../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";

interface SideProfileProps {
    profile: User | undefined;
}

const SideProfile = ({ profile }: SideProfileProps) => {
    const navigate = useNavigate();
    return (
        <div className="lg:col-span-1 space-y-6">
            {/* Account Info */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-100 mb-4">
                    Información de la Cuenta
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                        <BiCalendar size={16} className="text-cyan-400" />
                        <span>Miembro desde</span>
                    </div>
                    <p className="text-slate-100 font-semibold pl-6">
                        {new Date(profile?.createdAt!).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                </div>
            </div>

            {/* Security Status */}
            <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-2 border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                    <BiShield className="text-green-400" size={24} />
                    <h3 className="text-lg font-bold text-slate-100">
                        Estado de Seguridad
                    </h3>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300">Email verificado</span>
                        <MdVerifiedUser className="text-green-400" size={16} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300">Autenticación 2FA</span>
                        <span className="text-slate-500">No configurada</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-slate-300">Cuenta activa</span>
                        <span className="text-green-400">✓</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-100 mb-4">
                    Acciones Rápidas
                </h3>
                <div className="space-y-2">
                    <ButtonAction onClick={() => navigate("/dashboard/orders")} text="Ver mis pedidos" variant="outline" className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg transition-all flex items-center gap-3">
                        <BiPackage size={18} className="text-cyan-400" />
                    </ButtonAction>
                    <button className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg transition-all flex items-center gap-3">
                        <BiHeart size={18} className="text-cyan-400" />
                        Lista de deseos
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg transition-all flex items-center gap-3">
                        <BiMap size={18} className="text-cyan-400" />
                        Direcciones guardadas
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-200 rounded-lg transition-all flex items-center gap-3">
                        <MdLanguage size={18} className="text-cyan-400" />
                        Idioma y región
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideProfile