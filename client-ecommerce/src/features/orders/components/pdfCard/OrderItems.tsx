import type { OrderResponse } from "../../types/order.types";

interface OrderItemsProps {
    orderData: OrderResponse | undefined;
    orderItems: OrderResponse["items"] | undefined;
}
const OrderItems: React.FC<OrderItemsProps> = ({ orderData, orderItems }) => {
    return (
        <div className="bg-[#050505] p-6 border border-zinc-800 relative mb-8">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

            <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6">
                [ORDER_CONTENTS_MANIFEST]
            </h2>
            <div className="space-y-4">
                {orderItems?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 bg-black border border-zinc-800 p-4 hover:border-zinc-600 transition-all font-mono group"
                    >
                        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#00f0ff]/10 group-hover:opacity-0 transition-opacity z-10 pointer-events-none mix-blend-overlay"></div>
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-white text-[10px] uppercase tracking-widest">{item.productName}</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                                [QUANTITY_ALLOCATED]: <span className="text-[#00f0ff]">{item.quantity}</span>
                            </p>
                        </div>
                        <p className="text-sm font-bold text-[#e4ff00]">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="h-px bg-zinc-800 my-6 w-full"></div>

            <div className="flex justify-between items-center bg-black border border-zinc-800 p-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    [TOTAL_PROCESSED_FUNDS]:
                </span>
                <span className="text-lg font-bold text-[#ff0055] font-mono [text-shadow:_0_0_10px_#ff005580]">
                    ${orderData?.total?.toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default OrderItems;