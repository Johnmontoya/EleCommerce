import type React from "react";
import { BiEnvelope, BiLock } from "react-icons/bi";
import type { User } from "../../types/auth.types";

interface FormCredentialProps {
    userData: User;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getFieldsError: (fieldName: string) => string | undefined;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const FormCredential: React.FC<FormCredentialProps> = ({
    userData,
    onChangeCreateData,
    getFieldsError,
    confirmPassword,
    setConfirmPassword,
}) => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiLock size={20} className="text-cyan-400" />
                Credenciales de Acceso
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                        Email *
                    </label>
                    <div className="relative">
                        <BiEnvelope
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                            type="email"
                            name="email"
                            value={userData.email || ""}
                            onChange={onChangeCreateData}
                            required
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="john.doe@example.com"
                        />
                    </div>
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError?.("email")}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password || ""}
                            onChange={onChangeCreateData}
                            required
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="••••••••"
                        />
                        <div className="text-red-500 text-sm mt-1">
                            {getFieldsError?.("password")}
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Confirmar Contraseña *
                        </label>
                        <input
                            type="password"
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="••••••••"
                        />
                        <div className="text-red-500 text-sm mt-1">
                            {getFieldsError?.("confirmPassword")}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-3">
                    <p className="text-slate-400 text-xs">
                        La contraseña debe tener al menos 8 caracteres e incluir
                        mayúsculas, minúsculas y números.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormCredential;