import { BiLock } from "react-icons/bi";
import useInputs from "../../../shared/hooks/useInputs";
import { useChangePasswordMutation } from "../hook/mutation/useProfileMutation";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { toast } from "sonner";

interface SecurityInfoProps {
    activeTab: "inicio" | "pedidos" | "seguridad" | "preferencias";
}

const SecurityInfo = ({ activeTab }: SecurityInfoProps) => {
    const { user } = useAuthStore();
    const changePasswordMutation = useChangePasswordMutation();
    const [passwords, onChangePasswords, setPasswords] = useInputs({
        current: "",
        new: "",
        confirm: "",
    });
    const handleChangePassword = async () => {
        if (passwords.new !== passwords.confirm) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        let data = {
            email: user?.email!,
            otp: user?.otp!,
            password: passwords.current,
            newPassword: passwords.new,
        };

        await changePasswordMutation.mutateAsync(data);
        setPasswords({
            current: "",
            new: "",
            confirm: "",
        });
    };
    return (
        <>
            {activeTab === "seguridad" && (
                <div className="bg-[#050505] border border-zinc-800 p-6 md:p-8 font-mono relative group">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#FF0055] transition-colors" />

                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <span className="text-[#FF0055]">{'>'}</span> [PARAMETROS_DE_SEGURIDAD]
                        </h2>
                    </div>

                    <div className="space-y-6 max-w-xl">
                        <div className="space-y-1">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800">
                                [CONTRASEÑA_ACTUAL]
                            </label>
                            <input
                                type="password"
                                name="current"
                                value={passwords.current}
                                onChange={onChangePasswords}
                                className="w-full bg-black border border-zinc-800 text-white px-4 py-3 outline-none focus:border-[#FF0055] transition-colors font-mono tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800">
                                [NUEVA_CONTRASEÑA]
                            </label>
                            <input
                                type="password"
                                name="new"
                                value={passwords.new}
                                onChange={onChangePasswords}
                                className="w-full bg-black border border-zinc-800 text-white px-4 py-3 outline-none focus:border-[#FF0055] transition-colors font-mono tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-zinc-800">
                                [VERIFICAR_NUEVA_CONTRASEÑA]
                            </label>
                            <input
                                type="password"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={onChangePasswords}
                                className="w-full bg-black border border-zinc-800 text-white px-4 py-3 outline-none focus:border-[#FF0055] transition-colors font-mono tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            className="w-full bg-[#050505] border border-[#FF0055] hover:bg-[#FF0055] text-[#FF0055] hover:text-black mt-4 py-4 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                            <BiLock size={18} />
                            [ACTUALIZAR_CREDENCIA]
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecurityInfo;