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
            <div className="border-t border-slate-700 p-6 bg-slate-900/30">

                <div key={data?.id} className="grid grid-cols-1 gap-6">
                    {/* Items */}
                    <div>
                        <h4 className="text-lg font-bold text-slate-100 mb-4">
                            Productos ({data?.items?.length})
                        </h4>
                        <div className="space-y-3">
                            {data?.items?.map((item) => (
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
                                <BiMapPin className="text-cyan-400" size={20} />
                                Dirección de Envío
                            </h4>
                            <div className="text-sm text-slate-300">
                                <p>{data?.address?.street}</p>
                                <p>
                                    {data?.address?.city},{" "}
                                    {data?.address?.state}
                                </p>
                                <p>
                                    {data?.address?.zipCode},{" "}
                                    {data?.address?.country}
                                </p>
                            </div>
                            {data?.trackingNumber && (
                                <div className="mt-3 pt-3 border-t border-slate-700">
                                    <p className="text-slate-500 text-xs mb-1">
                                        Tracking:
                                    </p>
                                    <p className="text-cyan-400 font-semibold">
                                        {data?.trackingNumber}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Payment */}
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="text-lg font-bold text-slate-100 mb-3">
                                Método de Pago
                            </h4>
                            <p className="text-slate-300">{data?.paymentMethod}</p>
                        </div>
                    </div>
                </div>
            </div>
        </MiModal>
    );
};

export default ModalOrderDetails;