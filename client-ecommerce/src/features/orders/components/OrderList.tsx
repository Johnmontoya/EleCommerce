import type React from "react";
import { BiCalendar, BiChevronDown, BiChevronUp, BiDollarCircle, BiMap, BiPackage, BiTrash } from "react-icons/bi";
import type { OrderResponse } from "../types/order.types";
import { BadgeStatus } from "../../../shared/ui/BadgeStatus";
import ButtonAction from "../../../shared/ui/ButtonAction";
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
            <div className="space-y-4">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                        >
                            {/* Order Header */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
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

                                    <div className="flex flex-col gap-2">
                                        <ButtonAction
                                            text=""
                                            variant="edit"
                                            onClick={() => handleToggleExpand(order.id)}
                                        >
                                            {expandedOrder === order.id ? (
                                                <>
                                                    <BiChevronUp size={18} />
                                                    Ocultar
                                                </>
                                            ) : (
                                                <>
                                                    <BiChevronDown size={18} />
                                                    Ver Detalles
                                                </>
                                            )}
                                        </ButtonAction>
                                        <ButtonAction
                                            text="Borrar"
                                            variant="delete"
                                            onClick={() => handleDelete(order.id)}
                                        >
                                            <BiTrash size={18} />
                                        </ButtonAction>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (Expandible) */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-slate-700 p-6 bg-slate-900/30">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Items */}
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-100 mb-4">
                                                Productos ({order?.items?.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {order?.items?.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg"
                                                    >
                                                        <img
                                                            src={item.productImage}
                                                            alt={item.productName}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="text-slate-100 font-semibold">
                                                                {item.productName}
                                                            </p>
                                                            <p className="text-slate-400 text-sm">
                                                                Cantidad: {item.quantity} × ${item.price}
                                                            </p>
                                                        </div>
                                                        <p className="text-cyan-400 font-bold">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Customer & Shipping Info */}
                                        <div className="space-y-4">
                                            {/* Shipping */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
                                                    <BiMap className="text-cyan-400" size={20} />
                                                    Dirección de Envío
                                                </h4>
                                                <div className="text-sm text-slate-300">
                                                    <p>{order?.address?.street}</p>
                                                    <p>
                                                        {order?.address?.city},{" "}
                                                        {order?.address?.state}
                                                    </p>
                                                    <p>
                                                        {order?.address?.zipCode},{" "}
                                                        {order?.address?.country}
                                                    </p>
                                                </div>
                                                {order?.trackingNumber && (
                                                    <div className="mt-3 pt-3 border-t border-slate-700">
                                                        <p className="text-slate-500 text-xs mb-1">
                                                            Tracking:
                                                        </p>
                                                        <p className="text-cyan-400 font-semibold">
                                                            {order.trackingNumber}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Payment */}
                                            <div className="bg-slate-800/50 p-4 rounded-lg">
                                                <h4 className="text-lg font-bold text-slate-100 mb-3">
                                                    Método de Pago
                                                </h4>
                                                <p className="text-slate-300">{order?.paymentMethod}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-12 text-center backdrop-blur-sm">
                        <BiPackage size={64} className="mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400 text-lg mb-2">
                            No se encontraron pedidos
                        </p>
                        <p className="text-slate-500 text-sm">
                            Intenta ajustar los filtros de búsqueda
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderList;