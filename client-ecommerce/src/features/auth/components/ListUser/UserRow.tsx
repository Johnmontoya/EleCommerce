import { MdBlock, MdCheckCircle, MdEmail, MdPhone, MdVerifiedUser } from "react-icons/md";
import type { User } from "../../types/auth.types";
import { FaCheck } from "react-icons/fa";
import ButtonAction from "../../../../shared/ui/ButtonAction";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuthStore } from "../../store/useAuthStore";
import { useDeleteMutation, useToggleActiveMutation } from "../../hooks/mutation/useAuthMutation";
import { BiEdit, BiTrash } from "react-icons/bi";

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

    const handleDelete = (id: string) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            deleteMutation.mutateAsync({ id: id, adminToken: accessToken! });
        }
    };

    const handleToggleActive = (userId: string) => {
        toggleActiveMutation.mutateAsync({ id: userId, adminToken: accessToken! });
    };

    const getRoleBadge = (role: string) => {
        const styles = {
            ADMIN: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            SUPER_ADMIN: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            USER: "bg-orange-500/20 text-orange-400 border-orange-500/30"
        };

        const labels = {
            ADMIN: "Admin",
            SUPER_ADMIN: "Super Admin",
            USER: "Usuario"
        };

        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[role as keyof typeof styles]}`}
            >
                {labels[role as keyof typeof labels]}
            </span>
        );
    };

    return (
        <tr
            key={user?.id}
            className="text-center border-t border-slate-700 hover:bg-slate-700/30 transition-colors"
        >
            <td className="px-6 py-4">
                <label className="flex gap-3 items-center cursor-pointer relative">
                    <input type="checkbox" checked={selectedData.includes(user?.id!)} onChange={() => handleSelectData(user?.id!)} className="hidden peer" />
                    <span className="w-5 h-5 border border-slate-300 rounded relative flex items-center justify-center peer-checked:border-cyan-600"></span>
                    <FaCheck size={12} className="absolute hidden peer-checked:inline left-1 top-1/2 transform -translate-y-1/2 text-cyan-600" />
                </label>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={user?.avatar || "https://via.placeholder.com/40"}
                        alt={user?.username || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-600"
                    />
                    <div>
                        <p className="text-slate-100 font-semibold">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-slate-400 text-xs">
                            @{user?.username}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                        <MdEmail size={14} className="text-slate-500" />
                        {user?.email}
                        {user?.emailVerified && (
                            <MdVerifiedUser
                                size={14}
                                className="text-cyan-400"
                                title="Email verificado"
                            />
                        )}
                    </div>
                    {user.phone && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                            <MdPhone size={14} className="text-slate-500" />
                            {user.phone}
                        </div>
                    )}
                </div>
            </td>
            <td className="flex-1 m-auto px-6 py-4">{getRoleBadge(user?.role!)}</td>
            <td className="flex-1 justify-items-center items-center">
                <button
                    onClick={() => handleToggleActive(user?.id!)}
                    className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${user?.isActive
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        }`}
                >
                    {user.isActive ? (
                        <>
                            <MdCheckCircle size={14} />
                            Activo
                        </>
                    ) : (
                        <>
                            <MdBlock size={14} />
                            Inactivo
                        </>
                    )}
                </button>
            </td>
            <td className="px-6 py-4">
                <p className="text-slate-500 text-xs">
                    Creado:{" "}
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                </p>
            </td>
            <td className="px-6 py-4">
                <div className="flex mx-auto items-center justify-center gap-2">
                    <ButtonAction
                        variant="edit"
                        onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                        text=""
                    >
                        <BiEdit size={18} />
                    </ButtonAction>
                    <ButtonAction
                        variant="delete"
                        onClick={() => handleDelete(user?.id!)}
                        text=""
                    >
                        <BiTrash size={18} />
                    </ButtonAction>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;