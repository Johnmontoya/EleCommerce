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
        <div className="bg-[#050505] p-6 border border-zinc-800 relative mt-6">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

            <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <BiLock size={16} className="text-[#00f0ff]" />
                [CRED_ACCESO_SISTEMA]
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [CORREO_ELECTRONICO] *
                    </label>
                    <div className="relative">
                        <BiEnvelope
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00f0ff]"
                        />
                        <input
                            type="email"
                            name="email"
                            value={userData.email || ""}
                            onChange={onChangeCreateData}
                            required
                            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-10 py-3 rounded-none outline-none focus:border-[#e4ff00] font-mono text-[10px] uppercase tracking-widest transition-all"
                            placeholder="[INPUT_EMAIL_NODE]"
                        />
                    </div>
                    <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                        {getFieldsError?.("email")}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                            [CONTRASEÑA] *
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password || ""}
                            onChange={onChangeCreateData}
                            required
                            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#e4ff00] font-mono text-[10px] uppercase tracking-widest transition-all"
                            placeholder="[********]"
                        />
                        <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                            {getFieldsError?.("password")}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                            [CONFIRMAR_CONTRASEÑA] *
                        </label>
                        <input
                            type="password"
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#e4ff00] font-mono text-[10px] uppercase tracking-widest transition-all"
                            placeholder="[********]"
                        />
                        <div className="text-[#ff0055] font-mono text-[10px] uppercase tracking-widest mt-1">
                            {getFieldsError?.("confirmPassword")}
                        </div>
                    </div>
                </div>

                <div className="bg-black border border-[#e4ff00]/50 p-4 relative">
                    <p className="text-[#e4ff00] font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                        [ADVERTENCIA_SISTEMA: LA CONTRASEÑA DEBE CONTENER &gt;= 8 CARACTERES. REQUIERE MAYÚSCULAS, MINÚSCULAS Y NÚMEROS PARA PASAR LA CAPA DE ENCRIPTACIÓN.]
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormCredential;