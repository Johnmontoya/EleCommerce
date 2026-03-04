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
            <div className="bg-[#050505] p-6 border border-zinc-800 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

                <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                    <MdAdminPanelSettings size={16} className="text-[#00f0ff]" />
                    [SYS_ROLE_PERMISSIONS]
                </h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase mb-2">
                            [USER_ROLE]
                        </label>
                        <select
                            name="role"
                            value={userData.role || ""}
                            onChange={onChangeCreateData}
                            className="w-full bg-black border border-zinc-800 text-white px-4 py-3 rounded-none outline-none focus:border-[#00f0ff] font-mono text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                        >
                            <option value="">[SELECT_ROLE]</option>
                            <option value="USER">[USER]</option>
                            <option value="ADMIN">[ADMIN]</option>
                            <option value="SUPER_ADMIN">[SUPER_ADMIN]</option>
                        </select>
                    </div>

                    {/* Permisos */}
                    <div className="bg-black border border-zinc-700 p-4">
                        <p className="text-[#00f0ff] font-mono text-[10px] uppercase tracking-widest">
                            {userData.role === "SUPER_ADMIN" &&
                                "[FULL_SYSTEM_ACCESS_GRANTED]"}
                            {userData.role === "ADMIN" &&
                                "[CONTENT_USER_MGMT_GRANTED]"}
                            {userData.role === "USER" &&
                                "[BASIC_ACCOUNT_ACCESS]"}
                            {!userData.role && "[NO_ROLE_SELECTED]"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Estado de la Cuenta */}
            <div className="bg-[#050505] p-6 border border-zinc-800 relative">
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

                <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                    <MdVerifiedUser size={16} className="text-[#00f0ff]" />
                    [ACCOUNT_STATUS]
                </h2>

                <div className="space-y-4">
                    <label className="flex items-center gap-4 cursor-pointer bg-black border border-zinc-800 p-4 hover:border-[#00f0ff] transition-all relative group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={userData.isActive || false}
                                onChange={onChangeCreateData}
                                className="appearance-none w-4 h-4 border border-zinc-600 bg-black checked:bg-[#00f0ff] checked:border-[#00f0ff] cursor-pointer transition-all peer"
                            />
                            <div className="absolute hidden peer-checked:block w-2 h-2 bg-black" />
                        </div>
                        <div className="font-mono">
                            <p className="text-white text-[10px] uppercase tracking-widest font-bold">
                                [ACTIVE_ACCOUNT]
                            </p>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-1">
                                [USER_ACCESS_PERMITTED]
                            </p>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer bg-black border border-zinc-800 p-4 hover:border-[#00f0ff] transition-all relative group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                name="emailVerified"
                                checked={userData.emailVerified || false}
                                onChange={onChangeCreateData}
                                className="appearance-none w-4 h-4 border border-zinc-600 bg-black checked:bg-[#00f0ff] checked:border-[#00f0ff] cursor-pointer transition-all peer"
                            />
                            <div className="absolute hidden peer-checked:block w-2 h-2 bg-black" />
                        </div>
                        <div className="font-mono">
                            <p className="text-white text-[10px] uppercase tracking-widest font-bold">
                                [EMAIL_VERIFIED]
                            </p>
                            <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-1">
                                [EMAIL_SYSTEM_CONFIRMED]
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-[#00f0ff]/5 border border-[#00f0ff]/30 p-6 relative">
                <h3 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-4">
                    [SYSTEM_TIPS]
                </h3>
                <ul className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest space-y-3">
                    <li className="flex items-start gap-2">
                        <span className="text-[#00f0ff]">{">"}</span>
                        <span>[USE &gt;= 8 CHARS FOR PASSWORDS]</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#00f0ff]">{">"}</span>
                        <span>[VERIFY EMAIL BEFORE ACTIVATION]</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-[#00f0ff]">{">"}</span>
                        <span>
                            [ASSIGN PROPER SYSTEM CLEARANCE LEVELS]
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FormRoleAndState;