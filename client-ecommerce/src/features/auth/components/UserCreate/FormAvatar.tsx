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
        <div className="bg-[#050505] p-6 border border-zinc-800 relative mt-6 lg:mt-0">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

            <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <BiImage size={16} className="text-[#00f0ff]" />
                [AVATAR_SISTEMA]
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                        [URL_AVATAR]
                    </label>
                    <input
                        type="url"
                        name="avatar"
                        value={userData.avatar || ""}
                        onChange={onChangeCreateData}
                        className="w-full bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest transition-all"
                        placeholder="[HTTPS://...]"
                    />
                </div>

                {userData.avatar && (
                    <div className="flex items-center gap-6 bg-black border border-zinc-800 p-4 relative">
                        <img
                            src={userData.avatar}
                            alt="Avatar preview"
                            className="w-20 h-20 object-cover border border-[#e4ff00] rounded-none grayscale hover:grayscale-0 transition-all"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/80";
                            }}
                        />
                        <div className="flex-1 font-mono">
                            <p className="text-[#e4ff00] font-bold text-[10px] uppercase tracking-widest">
                                [PREVIEW_AVATAR]
                            </p>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
                                [VISUALIZACION_AVATAR]
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormAvatar;
