import type React from "react";
import { BiCalendar, BiChevronDown, BiChevronUp, BiDollarCircle, BiMap, BiPackage, BiTrash } from "react-icons/bi";
import type { OrderResponse } from "../types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";
import { useDeleteOrderMutation } from "../hook/mutation/useOrderMutation";
import SweetAlertas from "../../../shared/ui/SweetAlertas";

interface OrderListProps {
    orders: OrderResponse[] | undefined;
    expandedOrder: string | null;
    handleToggleExpand: (orderId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({
    orders,
    expandedOrder,
    handleToggleExpand,
}) => {
    const deleteOrderMutation = useDeleteOrderMutation();

    const Cancel = () => { };

    const ConfirmDeleteBlog = (id: string) => {
        deleteOrderMutation.mutateAsync(id);
    };

    const handleDelete = (id: string) => {
        SweetAlertas.OnDialogChoose({
            message: `Estas seguro de eliminar el pedido`,
            onConfirm: () => ConfirmDeleteBlog(id),
            onCancel: Cancel,
        });
    };

    return (
        <>
            <div className="space-y-4 font-mono">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className={`bg-[#050505] border border-zinc-800 transition-all overflow-hidden ${expandedOrder === order.id ? 'border-[#00f0ff]' : 'hover:border-zinc-600'}`}
                        >
                            {/* Order Header / Summary Row */}
                            <div className="p-4 sm:p-6 relative group">
                                {/* Subtle Hover Accent */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                <span className="text-zinc-600 font-normal">{'>'}</span>
                                                {order.trackingNumber}
                                            </h3>
                                            <BadgeStatus status={order.status} />
                                        </div>
                                        <div className="flex flex-wrap gap-6 text-xs text-zinc-500 font-bold uppercase tracking-widest">
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

                                    <div className="flex flex-row md:flex-col gap-2 shrink-0">
                                        <button
                                            onClick={() => handleToggleExpand(order.id)}
                                            className="text-zinc-500 hover:text-[#00f0ff] px-4 py-2 border border-transparent hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 text-xs font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-2 flex-1 md:flex-none"
                                        >
                                            {expandedOrder === order.id ? (
                                                <>
                                                    <BiChevronUp size={16} />
                                                    [COLLAPSE]
                                                </>
                                            ) : (
                                                <>
                                                    <BiChevronDown size={16} />
                                                    [DETAILS]
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="text-zinc-500 hover:text-[#ff0055] px-4 py-2 border border-transparent hover:border-[#ff0055] hover:bg-[#ff0055]/10 text-xs font-bold transition-all uppercase tracking-widest flex items-center justify-center gap-2 flex-1 md:flex-none"
                                        >
                                            <BiTrash size={16} />
                                            [CANCEL]
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (Expandible) */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-zinc-800 p-6 bg-black">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Items Container */}
                                        <div>
                                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                                    [ACQUIRED_ASSETS]
                                                </h4>
                                                <span className="text-zinc-600 text-[10px] tracking-widest uppercase font-bold">QTY: {order?.items?.length}</span>
                                            </div>
                                            <div className="space-y-4">
                                                {order?.items?.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-4 bg-[#050505] border border-zinc-900 shadow-sm p-3 relative group"
                                                    >
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#e4ff00] transition-colors" />
                                                        <img
                                                            src={item.productImage}
                                                            alt={item.productName}
                                                            className="w-12 h-12 object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-zinc-800"
                                                        />
                                                        <div className="flex-1 overflow-hidden">
                                                            <p className="text-white text-xs font-bold uppercase tracking-wider truncate">
                                                                {item.productName}
                                                            </p>
                                                            <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mt-1">
                                                                QTY: {item.quantity} × ${item.price}
                                                            </p>
                                                        </div>
                                                        <p className="text-[#e4ff00] font-black text-sm tracking-widest pl-2">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Customer & Shipping Info Container */}
                                        <div className="space-y-6">
                                            {/* Shipping */}
                                            <div>
                                                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                                                    <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                                        <BiMap className="text-[#00f0ff]" size={16} />
                                                        [DELIVERY_COORDINATES]
                                                    </h4>
                                                </div>
                                                <div className="bg-[#050505] border border-zinc-900 p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider leading-relaxed">
                                                    <p className="text-white">{order?.address?.street}</p>
                                                    <p>
                                                        {order?.address?.city}, {order?.address?.state}
                                                    </p>
                                                    <p>
                                                        {order?.address?.zipCode}, {order?.address?.country}
                                                    </p>

                                                    {order?.trackingNumber && (
                                                        <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between">
                                                            <p className="text-zinc-600 text-[10px]">
                                                                TRACKING_ID:
                                                            </p>
                                                            <p className="text-[#00f0ff] font-black tracking-widest">
                                                                {order.trackingNumber}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Payment Wrapper */}
                                            <div>
                                                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                                        [PAYMENT_TYPE]
                                                    </h4>
                                                </div>
                                                <div className="bg-[#050505] border border-zinc-900 p-4 flex items-center h-[60px]">
                                                    <p className="text-white text-xs font-black uppercase tracking-widest">{order?.paymentMethod || 'UNKNOWN'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-[#050505] border border-zinc-800 p-12 text-center font-mono">
                        <BiPackage size={48} className="mx-auto text-zinc-800 mb-4" />
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-1">
                            [SYSTEM_ALERT]
                        </p>
                        <p className="text-zinc-600 text-xs tracking-wider">
                            NO RECORDS FOUND MATCHING QUERY PARAMETERS.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderList;