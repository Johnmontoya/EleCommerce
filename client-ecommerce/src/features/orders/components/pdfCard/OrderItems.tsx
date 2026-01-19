import type { OrderResponse } from "../../types/order.types";

interface OrderItemsProps {
    orderData: OrderResponse | undefined;
    orderItems: OrderResponse["items"] | undefined;
}
const OrderItems: React.FC<OrderItemsProps> = ({ orderData, orderItems }) => {
    return (
        <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-2xl p-8 mb-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6">
                Productos Ordenados
            </h2>
            <div className="space-y-4">
                {orderItems?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 bg-slate-500/30 rounded-lg p-4"
                    >
                        <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden shrink-0">
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-slate-100">{item.productName}</p>
                            <p className="text-sm text-slate-400">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-bold text-cyan-400">
                            ${(item.price * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="h-px bg-slate-700 my-6"></div>

            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-100">Total Pagado:</span>
                <span className="text-2xl font-bold text-cyan-400">
                    ${orderData?.total}
                </span>
            </div>
        </div>
    );
};

export default OrderItems;