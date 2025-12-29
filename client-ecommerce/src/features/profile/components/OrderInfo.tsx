import { BiPackage } from "react-icons/bi";

interface OrderInfoProps {
    activeTab: "overview" | "orders" | "security" | "preferences";
}

const OrderInfo = ({ activeTab }: OrderInfoProps) => {
    return (
        <>
            {activeTab === "orders" && (
                <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-slate-100 mb-6">
                        Historial de Pedidos
                    </h2>
                    <div className="text-center py-12">
                        <BiPackage size={64} className="mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400 text-lg mb-2">
                            No hay pedidos todavía
                        </p>
                        <p className="text-slate-500 text-sm">
                            Tus pedidos aparecerán aquí
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderInfo;