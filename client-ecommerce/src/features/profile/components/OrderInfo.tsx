import { BiPackage } from "react-icons/bi";
import type { OrderResponse } from "../../orders/types/order.types";
import OrderCard from "./OrderCard";

interface OrderInfoProps {
    activeTab: "overview" | "orders" | "security" | "preferences";
    orders: OrderResponse[] | undefined;
}

const OrderInfo = ({ activeTab, orders }: OrderInfoProps) => {
    return (
        <>
            {activeTab === "orders" && (
                <div className="dash-search dark:dash-search border border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-slate-100 mb-6">
                        Historial de Pedidos
                    </h2>
                    <div>
                        {orders?.length! > 0 ? (
                            orders!.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <BiPackage size={64} className="mx-auto text-slate-600 mb-4" />
                                <p className="text-slate-400 text-lg mb-2">
                                    No hay pedidos todavía
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