import { MdCancel, MdCheckCircle, MdLocalShipping, MdPending, MdRefresh } from "react-icons/md";

export const BadgeStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case "PENDING":
            return (
                <div className="bg-[#ffaa00]/10 border border-[#ffaa00] text-[#ffaa00] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(255,170,0,0.15)]">
                    <MdPending size={14} />
                    <span>[PENDIENTE]</span>
                </div>
            );
        case "CONFIRMED":
            return (
                <div className="bg-[#00ffaa]/10 border border-[#00ffaa] text-[#00ffaa] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(0,255,170,0.15)]">
                    <MdCheckCircle size={14} />
                    <span>[CONFIRMADO]</span>
                </div>
            );
        case "PROCESSING":
            return (
                <div className="bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(0,240,255,0.15)]">
                    <MdLocalShipping size={14} />
                    <span>[PROCESANDO]</span>
                </div>
            );
        case "SHIPPED":
            return (
                <div className="bg-[#a200ff]/10 border border-[#a200ff] text-[#a200ff] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(162,0,255,0.15)]">
                    <MdLocalShipping size={14} />
                    <span>[ENVIADO]</span>
                </div>
            );
        case "DELIVERED":
            return (
                <div className="bg-[#e4ff00]/10 border border-[#e4ff00] text-[#e4ff00] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(228,255,0,0.15)]">
                    <MdCheckCircle size={14} />
                    <span>[ENTREGADO]</span>
                </div>
            );
        case "CANCELLED":
            return (
                <div className="bg-[#ff0055]/10 border border-[#ff0055] text-[#ff0055] px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(255,0,85,0.15)]">
                    <MdCancel size={14} />
                    <span>[CANCELADO]</span>
                </div>
            );
        case "REFUNDED":
            return (
                <div className="bg-zinc-800/50 border border-zinc-500 text-zinc-400 px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max shadow-[0_0_8px_rgba(161,161,170,0.15)]">
                    <MdRefresh size={14} />
                    <span>[REEMBOLSADO]</span>
                </div>
            );
        default:
            return (
                <div className="bg-black border border-zinc-700 text-zinc-500 px-3 py-1 rounded-none flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] w-max">
                    <span>[ESTADO_DESCONOCIDO]</span>
                </div>
            );
    }
}