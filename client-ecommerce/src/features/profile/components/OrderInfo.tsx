import { BiPackage } from "react-icons/bi";
import type { OrderResponse } from "../../orders/types/order.types";
import OrderCard from "./OrderCard";

interface OrderInfoProps {
    activeTab: "inicio" | "pedidos" | "seguridad" | "preferencias";
    orders: OrderResponse[] | undefined;
}

const OrderInfo = ({ activeTab, orders }: OrderInfoProps) => {
    return (
        <>
            {activeTab === "pedidos" && (
                <div className="bg-[#050505] border border-zinc-800 p-6 md:p-8 font-mono relative group">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-zinc-600 group-hover:border-[#00f0ff] transition-colors" />

                    <h2 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="text-[#00f0ff]">{'>'}</span> [HISTORIAL_DE_TRANSACCIONES]
                    </h2>
                    <div className="space-y-4">
                        {(orders?.length ?? 0) > 0 ? (
                            orders?.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="bg-black border border-zinc-900 p-12 text-center">
                                <BiPackage size={48} className="mx-auto text-zinc-800 mb-4" />
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                                    [ALERTA_DEL_SISTEMA]
                                </p>
                                <p className="text-zinc-600 text-[10px] tracking-wider uppercase">
                                    NO SE ENCONTRARON TRANSACCIONES EN LOS REGISTROS.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderInfo;