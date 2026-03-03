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
        <div className="lg:col-span-1 space-y-6 font-mono">
            {/* Account Info */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative group">
                {/* Accent Corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#00f0ff] transition-colors" />

                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="text-[#00f0ff]">{'>'}</span> [ACCOUNT_DATA]
                </h3>

                <div className="space-y-4">
                    <div className="border border-zinc-900 bg-black p-4">
                        <div className="flex items-center gap-2 text-zinc-500 mb-2 text-xs font-bold uppercase tracking-widest">
                            <BiCalendar size={14} className="text-zinc-400" />
                            [MEMBER_SINCE]
                        </div>
                        <p className="text-[#e4ff00] font-black tracking-widest text-sm pl-6">
                            {new Date(profile?.createdAt!).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }).replace(/\//g, '.')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Security Status */}
            <div className="bg-[#020202] border border-[#00f0ff]/30 p-6 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff]" />

                <div className="flex items-center gap-3 mb-6">
                    <BiShield className="text-[#00f0ff]" size={20} />
                    <h3 className="text-sm font-black text-[#00f0ff] uppercase tracking-widest">
                        [SECURITY_STATUS]
                    </h3>
                </div>

                <div className="space-y-3 text-xs font-bold tracking-widest uppercase">
                    <div className="flex flex-col bg-black p-3 border border-zinc-900 gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500">[EMAIL_VERIFIED]</span>
                            {profile?.emailVerified ? (
                                <MdVerifiedUser className="text-[#e4ff00]" size={16} />
                            ) : (
                                <span className="text-[#ff0055] text-[10px]">[PENDING]</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col bg-black p-3 border border-zinc-900 gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-zinc-500">[2FA_AUTH]</span>
                            <span className="text-[#ff0055] text-[10px]">[DISABLED]</span>
                        </div>
                    </div>
                    <div className="flex flex-col bg-black p-3 border border-[#00f0ff]/20 gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[#00f0ff]">[SYSTEM_STATUS]</span>
                            <span className="text-[#00f0ff]">[ACTIVE]</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#050505] border border-zinc-800 p-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="text-[#00f0ff]">{'>'}</span> [QUICK_ACTIONS]
                </h3>

                <div className="space-y-3">
                    <ButtonAction
                        onClick={() => navigate("/dashboard/orders")}
                        text="[VIEW_TRANSACTIONS]"
                        variant="outline"
                        className="w-full text-left px-4 py-3 bg-black border border-zinc-800 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 text-zinc-400 hover:text-white rounded-none transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest group"
                    >
                        <BiPackage size={16} className="text-zinc-600 group-hover:text-[#00f0ff] transition-colors" />
                    </ButtonAction>

                    <ButtonAction
                        onClick={() => navigate("/wishlist")}
                        text="[WISH_LIST]"
                        variant="outline"
                        className="w-full text-left px-4 py-3 bg-black border border-zinc-800 hover:border-[#e4ff00] hover:bg-[#e4ff00]/10 text-zinc-400 hover:text-white rounded-none transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest group"
                    >
                        <BiHeart size={16} className="text-zinc-600 group-hover:text-[#e4ff00] transition-colors" />
                    </ButtonAction>

                    <button className="w-full text-left px-4 py-3 bg-black border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest group">
                        <BiMap size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                        [SAVED_COORDINATES]
                    </button>

                    <button className="w-full text-left px-4 py-3 bg-black border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest group">
                        <MdLanguage size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                        [REGION_SETTINGS]
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideProfile