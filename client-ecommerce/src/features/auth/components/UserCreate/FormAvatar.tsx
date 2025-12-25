import { BiImage } from "react-icons/bi";
import type { User } from "../../types/auth.types";

interface FormAvatarProps {
    userData: User;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormAvatar: React.FC<FormAvatarProps> = ({
    userData,
    onChangeCreateData,
}) => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiImage size={20} className="text-cyan-400" />
                Foto de Perfil
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                        URL del Avatar
                    </label>
                    <input
                        type="url"
                        name="avatar"
                        value={userData.avatar || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="https://example.com/avatar.jpg"
                    />
                </div>

                {userData.avatar && (
                    <div className="flex items-center gap-4 bg-slate-700/30 p-4 rounded-lg">
                        <img
                            src={userData.avatar}
                            alt="Avatar preview"
                            className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/80";
                            }}
                        />
                        <div className="flex-1">
                            <p className="text-slate-200 font-semibold">
                                Vista Previa
                            </p>
                            <p className="text-slate-400 text-xs">
                                Así se verá tu avatar
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormAvatar;
