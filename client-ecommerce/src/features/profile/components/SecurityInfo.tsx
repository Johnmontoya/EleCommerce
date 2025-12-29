import { BiLock } from "react-icons/bi";
import useInputs from "../../../shared/hooks/useInputs";
import { useChangePasswordMutation } from "../hook/mutation/useProfileMutation";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { toast } from "sonner";

interface SecurityInfoProps {
    activeTab: "overview" | "orders" | "security" | "preferences";
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
            {activeTab === "security" && (
                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                            <BiLock size={20} className="text-cyan-400" />
                            Cambiar Contraseña
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-300 font-semibold mb-2">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                name="current"
                                value={passwords.current}
                                onChange={onChangePasswords}
                                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-semibold mb-2">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                name="new"
                                value={passwords.new}
                                onChange={onChangePasswords}
                                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 font-semibold mb-2">
                                Confirmar Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={onChangePasswords}
                                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-400"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all"
                        >
                            Actualizar Contraseña
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SecurityInfo;