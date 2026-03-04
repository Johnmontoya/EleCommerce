import { BiPackage } from "react-icons/bi";
import type { OrderResponse } from "../../types/order.types";
import moment from "moment";

interface CardInformationProps {
    orderData: OrderResponse | undefined;
}
const CardInformation: React.FC<CardInformationProps> = ({ orderData }) => {
    return (
        <div className="bg-[#050505] p-6 border border-zinc-800 relative mb-8">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff] opacity-50 pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border-l-2 border-[#00f0ff] pl-4">
                    <p className="text-[10px] text-zinc-500 mb-1 font-mono uppercase tracking-widest">[TRACKING_NUMBER]</p>
                    <p className="text-lg font-bold text-[#e4ff00] font-mono">{orderData?.trackingNumber}</p>
                </div>
                <div className="border-l-2 border-zinc-700 pl-4">
                    <p className="text-[10px] text-zinc-500 mb-1 font-mono uppercase tracking-widest">[DATE_OF_ISSUE]</p>
                    <p className="text-sm font-bold text-white font-mono uppercase">{moment(orderData?.createdAt).format("DD/MM/YYYY")}</p>
                </div>
            </div>

            <div className="h-px bg-zinc-800 mb-8 w-full"></div>

            {/* What's Next Section */}
            <div className="mb-8">
                <h2 className="text-[#00f0ff] font-mono text-[12px] font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                    <BiPackage size={16} className="text-[#00f0ff]" />
                    [NEXT_STEPS_SEQUENCE]
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-black border border-zinc-800 p-4 relative group">
                        <div className="w-8 h-8 bg-[#00f0ff]/10 border border-[#00f0ff] rounded-none flex items-center justify-center mb-4 transition-all">
                            <span className="text-[#00f0ff] font-bold font-mono text-sm [text-shadow:_0_0_8px_#00f0ff]">1</span>
                        </div>
                        <h3 className="font-bold text-white mb-2 font-mono text-[10px] uppercase tracking-widest">[STAGE_1:_CONFIRMATION]</h3>
                        <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">
                            [EMAIL_CONFIRMATION_INCOMING]
                        </p>
                    </div>
                    <div className="bg-black border border-zinc-800 p-4 relative group">
                        <div className="w-8 h-8 bg-zinc-800 border border-zinc-600 rounded-none flex items-center justify-center mb-4 transition-all group-hover:bg-[#00f0ff]/10 group-hover:border-[#00f0ff]">
                            <span className="text-zinc-400 font-bold font-mono text-sm group-hover:text-[#00f0ff] transition-all">2</span>
                        </div>
                        <h3 className="font-bold text-white mb-2 font-mono text-[10px] uppercase tracking-widest">[STAGE_2:_PREPARATION]</h3>
                        <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">
                            [ASSEMBLING_ORDER_CONTENTS]
                        </p>
                    </div>
                    <div className="bg-black border border-zinc-800 p-4 relative group">
                        <div className="w-8 h-8 bg-zinc-800 border border-zinc-600 rounded-none flex items-center justify-center mb-4 transition-all group-hover:bg-[#00f0ff]/10 group-hover:border-[#00f0ff]">
                            <span className="text-zinc-400 font-bold font-mono text-sm group-hover:text-[#00f0ff] transition-all">3</span>
                        </div>
                        <h3 className="font-bold text-white mb-2 font-mono text-[10px] uppercase tracking-widest">[STAGE_3:_DISPATCH]</h3>
                        <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-widest leading-relaxed">
                            [ESTIMATED_DISPATCH: {moment(orderData?.createdAt).add(1, "days").format("DD/MM/YYYY")}]
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-800 mb-8 w-full"></div>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-black border border-zinc-800 p-4">
                    <h3 className="font-bold text-[#e4ff00] mb-3 font-mono text-[10px] uppercase tracking-widest">[PAYMENT_METHOD]</h3>
                    <p className="text-white font-mono text-xs tracking-widest uppercase">{orderData?.paymentMethod}</p>
                </div>
                <div className="bg-black border border-zinc-800 p-4">
                    <h3 className="font-bold text-[#e4ff00] mb-3 font-mono text-[10px] uppercase tracking-widest">[SHIPPING_DESTINATION]</h3>
                    <p className="text-white font-mono text-[10px] tracking-widest uppercase leading-relaxed">
                        {orderData?.address?.street}<br />
                        {orderData?.address?.city}, {orderData?.address?.state}<br />
                        [ZIP: {orderData?.address?.zipCode}]
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;