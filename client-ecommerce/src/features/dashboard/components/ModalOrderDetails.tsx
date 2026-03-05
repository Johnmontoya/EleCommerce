import { BiMapPin } from "react-icons/bi";
import MiModal from "../../../shared/ui/Modal";
import type { OrderResponse } from "../../orders/types/order.types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: OrderResponse | null;
}

const ModalOrderDetails = ({ isOpen, onClose, title, data }: Props) => {
    return (
        <MiModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <div className="h-[400px] overflow-y-scroll border-t border-zinc-800 p-6 bg-black font-mono">

                <div key={data?.id} className="grid grid-cols-1 gap-8">
                    {/* Items */}
                    <div>
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                [ARTICULOS_ADQUIRIDOS]
                            </h4>
                            <span className="text-zinc-600 text-[10px] tracking-widest uppercase font-bold">QTY: {data?.items?.length}</span>
                        </div>
                        <div className="space-y-4">
                            {data?.items?.map((item) => (
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

                    {/* Customer & Shipping Info */}
                    <div className="space-y-6">

                        {/* Shipping */}
                        <div>
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                                <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                    <BiMapPin className="text-[#00f0ff]" size={16} />
                                    [DIRECCIÓN_DE_ENTREGA]
                                </h4>
                            </div>
                            <div className="bg-[#050505] border border-zinc-900 p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider leading-relaxed">
                                <p className="text-white">{data?.address?.street}</p>
                                <p>
                                    {data?.address?.city},{" "}
                                    {data?.address?.state}
                                </p>
                                <p>
                                    {data?.address?.zipCode},{" "}
                                    {data?.address?.country}
                                </p>
                                {data?.trackingNumber && (
                                    <div className="mt-4 pt-4 border-t border-zinc-900 flex items-center justify-between">
                                        <p className="text-zinc-600 text-[10px]">
                                            ID_DE_SEGUIMIENTO:
                                        </p>
                                        <p className="text-[#00f0ff] font-black tracking-widest">
                                            {data?.trackingNumber}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment */}
                        <div>
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-4">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                    [TIPO_DE_PAGO]
                                </h4>
                            </div>
                            <div className="bg-[#050505] border border-zinc-900 p-4 flex items-center h-[60px]">
                                <p className="text-white text-xs font-black uppercase tracking-widest">{data?.paymentMethod || 'UNKNOWN'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MiModal>
    );
};

export default ModalOrderDetails;