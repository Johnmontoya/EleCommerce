import { MdCancel, MdCheckCircle, MdLocalShipping, MdPending, MdRefresh } from "react-icons/md";

export const BadgeStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case "PENDING":
            return (
                <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdPending size={16} />
                    Pendiente
                </div>
            );
        case "CONFIRMED":
            return (
                <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCheckCircle size={16} />
                    Confirmado
                </div>
            );
        case "PROCESSING":
            return (
                <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdLocalShipping size={16} />
                    Procesando
                </div>
            );
        case "SHIPPED":
            return (
                <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdLocalShipping size={16} />
                    Enviado
                </div>
            );
        case "DELIVERED":
            return (
                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCheckCircle size={16} />
                    Entregado
                </div>
            );
        case "CANCELLED":
            return (
                <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCancel size={16} />
                    Cancelado
                </div>
            );
        case "REFUNDED":
            return (
                <div className="bg-slate-500/20 text-slate-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdRefresh size={16} />
                    Devuelto
                </div>
            );
        default:
            return "Desconocido";
    }
}