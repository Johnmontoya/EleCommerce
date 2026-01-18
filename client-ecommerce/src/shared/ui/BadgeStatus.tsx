import { MdCancel, MdCheckCircle, MdLocalShipping, MdPending, MdRefresh } from "react-icons/md";

export const BadgeStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case "PENDING":
            return (
                <div className="bg-yellow-600 text-yellow-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdPending size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Pendiente</span>
                </div>
            );
        case "CONFIRMED":
            return (
                <div className="bg-emerald-600 text-emerald-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCheckCircle size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Confirmado</span>
                </div>
            );
        case "PROCESSING":
            return (
                <div className="bg-blue-600 text-blue-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdLocalShipping size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Procesando</span>
                </div>
            );
        case "SHIPPED":
            return (
                <div className="bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdLocalShipping size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Enviado</span>
                </div>
            );
        case "DELIVERED":
            return (
                <div className="bg-green-600 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCheckCircle size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Entregado</span>
                </div>
            );
        case "CANCELLED":
            return (
                <div className="bg-red-600 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdCancel size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Cancelado</span>
                </div>
            );
        case "REFUNDED":
            return (
                <div className="bg-slate-600 text-slate-400 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MdRefresh size={16} className="text-slate-100" />
                    <span className="text-sm text-slate-100">Devuelto</span>
                </div>
            );
        default:
            return "Desconocido";
    }
}