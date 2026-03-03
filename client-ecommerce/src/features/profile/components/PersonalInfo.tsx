import { BiEdit } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import { useState } from "react";
import ModalInfo from "./ModalInfo";
import ModalAddress from "./ModalAddress";
import type { User } from "../../auth/types/auth.types";

interface Props {
    activeTab: string;
    profile: User | undefined;
}

const PersonalInfo = ({ activeTab, profile }: Props) => {
    const [isModalOpenPersonal, setIsModalOpenPersonal] = useState(false);
    const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);

    return (
        <>
            <ModalInfo
                isOpen={isModalOpenPersonal}
                onClose={() => setIsModalOpenPersonal(false)}
                title="Editar Usuario"
                data={profile}
            />
            <ModalAddress
                isOpen={isModalOpenAddress}
                onClose={() => setIsModalOpenAddress(false)}
                title="Editar Dirección"
                data={profile}
            />
            {activeTab === "overview" && (
                <div className="space-y-6 font-mono">
                    {/* Personal Information */}
                    <div className="bg-[#050505] border border-zinc-800 p-6 md:p-8 relative group">
                        {/* Accent Corner */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#00f0ff] transition-colors" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#00f0ff]">{'>'}</span> [PERSONAL_DATA]
                            </h2>

                            <button
                                onClick={() => setIsModalOpenPersonal(true)}
                                className="bg-[#050505] border border-zinc-700 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <BiEdit size={16} />
                                [EDIT_RECORD]
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black p-6 border border-zinc-900">
                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [FIRST_NAME]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.firstName}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [LAST_NAME]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.lastName}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [CONTACT_EMAIL]
                                </label>
                                <p className="text-white font-bold tracking-wider flex items-center gap-2">
                                    {profile?.email}
                                    {profile?.emailVerified && (
                                        <MdVerifiedUser className="text-[#e4ff00]" size={14} />
                                    )}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [COMM_LINK]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.phone || "UNSPECIFIED"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-[#050505] border border-zinc-800 p-6 md:p-8 relative group">
                        {/* Accent Corner */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#00f0ff] transition-colors" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="text-[#00f0ff]">{'>'}</span> [LOCATION_DATA]
                            </h2>
                            <button
                                onClick={() => setIsModalOpenAddress(true)}
                                className="bg-[#050505] border border-zinc-700 hover:border-[#00f0ff] text-zinc-400 hover:text-[#00f0ff] px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <BiEdit size={16} />
                                [EDIT_COORDINATES]
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black p-6 border border-zinc-900">
                            <div className="col-span-1 md:col-span-2 border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [STREET_ADDRESS]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.addresses![0]?.street || "UNSPECIFIED"}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [CITY_SECTOR]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.addresses![0]?.city || "UNSPECIFIED"}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [POSTAL_CODE]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.addresses![0]?.zipCode || "UNSPECIFIED"}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [STATE_REGION]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.addresses![0]?.state || "UNSPECIFIED"}
                                </p>
                            </div>

                            <div className="border-l-2 border-zinc-800 pl-4 py-1">
                                <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    [TERRITORY]
                                </label>
                                <p className="text-white font-bold tracking-wider uppercase">
                                    {profile?.addresses![0]?.country || "UNSPECIFIED"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PersonalInfo;