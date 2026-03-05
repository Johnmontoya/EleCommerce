import { MdBlock, MdCheckCircle, MdEmail, MdPhone, MdVerifiedUser } from "react-icons/md";
import type { User } from "../../types/auth.types";
import { FaCheck } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuthStore } from "../../store/useAuthStore";
import { useDeleteMutation, useToggleActiveMutation } from "../../hooks/mutation/useAuthMutation";
import { BiEdit, BiTrash } from "react-icons/bi";
import SweetAlertas from "../../../../shared/ui/SweetAlertas";

interface UserRowProps {
    user: User;
    selectedData: string[];
    handleSelectData: (id: string) => void;
}
const UserRow: React.FC<UserRowProps> = ({ user, selectedData, handleSelectData }) => {
    const navigate = useNavigate();
    const { accessToken } = useAuthStore();
    const deleteMutation = useDeleteMutation();
    const toggleActiveMutation = useToggleActiveMutation();

    const Cancel = () => { };

    const ConfirmDeleteBlog = (id: string) => {
        deleteMutation.mutateAsync({ id: id, adminToken: accessToken! });
    };

    const handleDelete = (id: string) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar el usuario ${user?.username}`,
            onConfirm: () => ConfirmDeleteBlog(id),
            onCancel: Cancel,
        });
    };

    const handleToggleActive = (userId: string) => {
        toggleActiveMutation.mutateAsync({ id: userId, adminToken: accessToken! });
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            ADMIN: "bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/50",
            SUPER_ADMIN: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50",
            USER: "bg-[#e4ff00]/10 text-[#e4ff00] border-[#e4ff00]/50"
        };

        const labels = {
            ADMIN: "[ADMIN]",
            SUPER_ADMIN: "[SUPER_ADMIN]",
            USER: "[USER]"
        };

        return (
            <span
                className={`px-2 py-1 uppercase tracking-widest text-[10px] font-mono border ${styles[role as keyof typeof styles]}`}
            >
                {labels[role as keyof typeof labels]}
            </span>
        );
    };

    return (
        <tr
            key={user?.id}
            className="text-center border-b border-zinc-800 bg-[#050505] hover:bg-[#00f0ff]/5 transition-colors group"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative justify-center">
                    <input type="checkbox" checked={selectedData.includes(user.id || "")} onChange={() => handleSelectData(user.id || "")} className="hidden peer" />
                    <span className="w-4 h-4 border border-zinc-600 bg-black relative flex items-center justify-center peer-checked:border-[#00f0ff] peer-checked:bg-[#00f0ff]/20 transition-all rounded-none"></span>
                    <FaCheck size={10} className="absolute hidden peer-checked:inline top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00f0ff]" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-3">
                    <img
                        src={user?.avatar || "https://via.placeholder.com/40"}
                        alt={user?.username || "User"}
                        className="w-10 h-10 object-cover border border-zinc-700 group-hover:border-[#00f0ff] transition-colors rounded-none grayscale group-hover:grayscale-0"
                    />
                    <div className="text-left">
                        <p className="text-white font-mono uppercase tracking-widest text-[11px]">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-zinc-500 font-mono text-[10px]">
                            @{user?.username && user.username.length > 20
                                ? `${user.username.substring(0, 20)}...`
                                : user.username}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="space-y-1 font-mono">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest">
                        <MdEmail size={12} className="text-[#00f0ff]" />
                        {user?.email}
                        {user?.emailVerified && (
                            <MdVerifiedUser
                                size={12}
                                className="text-[#e4ff00]"
                                title="Email verificado"
                            />
                        )}
                    </div>
                    {user.phone && (
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest">
                            <MdPhone size={12} className="text-[#00f0ff]" />
                            {user.phone}
                        </div>
                    )}
                </div>
            </td>
            <td className="flex-1 m-auto px-6 py-4">{getRoleBadge(user.role || "")}</td>
            <td className="flex-1 justify-items-center items-center">
                <button
                    onClick={() => handleToggleActive(user.id || "")}
                    className={`flex items-center justify-center gap-2 px-2 py-1 font-mono uppercase tracking-widest text-[10px] transition-all cursor-pointer border ${user?.isActive
                        ? "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/50 hover:bg-[#00f0ff]/20"
                        : "bg-[#ff0055]/10 text-[#ff0055] border-[#ff0055]/50 hover:bg-[#ff0055]/20"
                        }`}
                >
                    {user.isActive ? (
                        <>
                            <MdCheckCircle size={12} />
                            [ACTIVE]
                        </>
                    ) : (
                        <>
                            <MdBlock size={12} />
                            [INACTIVE]
                        </>
                    )}
                </button>
            </td>
            <td className="px-6 py-4">
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                </p>
            </td>
            <td className="px-6 py-4">
                <div className="flex mx-auto items-center justify-center gap-2">
                    <button
                        onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                        className="p-2 border border-zinc-700 bg-transparent text-zinc-400 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
                    >
                        <BiEdit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(user.id || "")}
                        className="p-2 border border-zinc-700 bg-transparent text-zinc-400 hover:border-[#ff0055] hover:text-[#ff0055] transition-all"
                    >
                        <BiTrash size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;