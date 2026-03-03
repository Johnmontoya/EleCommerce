import { BiCalendar, BiDollarCircle } from "react-icons/bi";
import type { OrderResponse } from "../../orders/types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";

const OrderCard = ({ order }: { order: OrderResponse }) => {

    return (
        <div className="bg-[#050505] border border-zinc-800 p-4 transition-all hover:border-[#00f0ff] relative group">
            {/* Hover Accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 mb-3 pl-2">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="text-zinc-600 font-normal">{'>'}</span>
                    {order.trackingNumber}
                </h3>
                <BadgeStatus status={order.status} />
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-zinc-500 font-bold uppercase tracking-widest pl-2">
                <div className="flex items-center gap-2">
                    <BiCalendar size={14} className="text-zinc-600" />
                    {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).replace(/\//g, '.')}
                </div>
                <div className="flex items-center gap-2 text-[#e4ff00]">
                    <BiDollarCircle size={14} />
                    ${order.total}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;