import { BiCalendar, BiDollarCircle } from "react-icons/bi";
import type { OrderResponse } from "../../orders/types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";

const OrderCard = ({ order }: { order: OrderResponse }) => {

    return (
        <div className="flex-1 border border-1 border-slate-700 rounded-lg p-4 my-1 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-slate-100">
                    {order.trackingNumber}
                </h3>
                <BadgeStatus status={order.status} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <BiCalendar size={16} />
                    {new Date(order.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
                <div className="flex items-center gap-2">
                    <BiDollarCircle size={16} />
                    ${order.total}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;