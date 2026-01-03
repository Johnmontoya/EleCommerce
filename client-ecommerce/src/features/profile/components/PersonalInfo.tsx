import { BiUser, BiEdit, BiMap } from "react-icons/bi";
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
                <>
                    {/* Personal Information */}
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <BiUser size={20} className="text-cyan-400" />
                                Información Personal
                            </h2>

                            <button
                                onClick={() => setIsModalOpenPersonal(true)}
                                className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg font-semibold transition-all"
                            >
                                <BiEdit size={18} />
                                Editar
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Nombre
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.firstName}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Apellido
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.lastName}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Email
                                </label>
                                <p className="text-slate-100 font-semibold flex items-center gap-2">
                                    {profile?.email}
                                    {profile?.emailVerified && (
                                        <MdVerifiedUser className="text-cyan-400" size={16} />
                                    )}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Teléfono
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.phone || "No especificado"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <BiMap size={20} className="text-cyan-400" />
                                Dirección
                            </h2>
                            <button
                                onClick={() => setIsModalOpenAddress(true)}
                                className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg font-semibold transition-all"
                            >
                                <BiEdit size={18} />
                                Editar
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-slate-400 text-sm mb-2">
                                    Dirección
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.addresses![0].street || "No especificado"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Ciudad
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.addresses![0].city || "No especificado"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Código Postal
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.addresses![0].zipCode || "No especificado"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    Estado/Región
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.addresses![0].state || "No especificado"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">
                                    País
                                </label>
                                <p className="text-slate-100 font-semibold">
                                    {profile?.addresses![0].country || "No especificado"}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PersonalInfo;