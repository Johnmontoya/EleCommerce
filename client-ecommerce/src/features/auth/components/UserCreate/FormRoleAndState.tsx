import type React from "react";
import { MdAdminPanelSettings, MdVerifiedUser } from "react-icons/md";
import type { User } from "../../types/auth.types";

interface FormRoleAndStateProps {
    userData: User;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormRoleAndState: React.FC<FormRoleAndStateProps> = ({
    userData,
    onChangeCreateData,
}) => {
    return (
        <div className="lg:col-span-1 space-y-6">
            {/* Rol y Permisos */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <MdAdminPanelSettings size={20} className="text-cyan-400" />
                    Rol y Permisos
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Rol del Usuario
                        </label>
                        <select
                            name="role"
                            value={userData.role || ""}
                            onChange={onChangeCreateData}
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 cursor-pointer"
                        >
                            <option value="">Seleccione un Rol</option>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                    </div>

                    {/* Permisos */}
                    <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-3">
                        <p className="text-slate-400 text-xs">
                            {userData.role === "SUPER_ADMIN" &&
                                "Acceso completo al sistema"}
                            {userData.role === "ADMIN" &&
                                "Gestión de contenido y usuarios"}
                            {userData.role === "USER" &&
                                "Gestión de su cuenta"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Estado de la Cuenta */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <MdVerifiedUser size={20} className="text-cyan-400" />
                    Estado de la Cuenta
                </h2>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={userData.isActive || false}
                            onChange={onChangeCreateData}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                        />
                        <div>
                            <p className="text-slate-200 font-medium">
                                Cuenta Activa
                            </p>
                            <p className="text-slate-500 text-xs">
                                El usuario puede acceder al sistema
                            </p>
                        </div>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-all">
                        <input
                            type="checkbox"
                            name="emailVerified"
                            checked={userData.emailVerified || false}
                            onChange={onChangeCreateData}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-0 cursor-pointer"
                        />
                        <div>
                            <p className="text-slate-200 font-medium">
                                Email Verificado
                            </p>
                            <p className="text-slate-500 text-xs">
                                El email ha sido confirmado
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-slate-100 mb-3">
                    💡 Consejos
                </h3>
                <ul className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Usa contraseñas seguras de al menos 8 caracteres</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>Verifica el email antes de activar la cuenta</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>
                            Asigna el rol apropiado según las responsabilidades
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FormRoleAndState;