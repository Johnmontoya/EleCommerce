import { BiPackage } from "react-icons/bi";
import type { OrderResponse } from "../../types/order.types";
import moment from "moment";

interface CardInformationProps {
    orderData: OrderResponse | undefined;
}
const CardInformation: React.FC<CardInformationProps> = ({ orderData }) => {
    return (
        <div className="dash-search dark:dash-search backdrop-blur-sm border border-slate-600 rounded-2xl p-8 mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                    <p className="text-sm text-slate-400 mb-1">Tracking Number</p>
                    <p className="text-xl font-bold text-cyan-400">{orderData?.trackingNumber}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-400 mb-1">Fecha del Pedido</p>
                    <p className="text-lg font-semibold text-slate-100">{moment(orderData?.createdAt).format("DD/MM/YYYY")}</p>
                </div>
            </div>

            <div className="h-px bg-slate-700 mb-8"></div>

            {/* What's Next Section */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <BiPackage size={24} className="text-cyan-400" />
                    ¿Qué sigue?
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-500/30 rounded-lg p-4">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                            <span className="text-cyan-400 font-bold">1</span>
                        </div>
                        <h3 className="font-semibold text-slate-100 mb-2">Confirmación</h3>
                        <p className="text-sm text-slate-400">
                            Recibirás un email de confirmación en los próximos minutos
                        </p>
                    </div>
                    <div className="bg-slate-500/30 rounded-lg p-4">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                            <span className="text-cyan-400 font-bold">2</span>
                        </div>
                        <h3 className="font-semibold text-slate-100 mb-2">Preparación</h3>
                        <p className="text-sm text-slate-400">
                            Prepararemos tu pedido con mucho cuidado
                        </p>
                    </div>
                    <div className="bg-slate-500/30 rounded-lg p-4">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mb-3">
                            <span className="text-cyan-400 font-bold">3</span>
                        </div>
                        <h3 className="font-semibold text-slate-100 mb-2">Envío</h3>
                        <p className="text-sm text-slate-400">
                            Lo enviaremos a tu dirección en {moment(orderData?.createdAt).add(1, "days").format("DD/MM/YYYY")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-slate-700 mb-8"></div>

            {/* Order Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-slate-100 mb-3">Método de Pago</h3>
                    <p className="text-slate-300">{orderData?.paymentMethod}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-slate-100 mb-3">Dirección de Envío</h3>
                    <p className="text-slate-300">{orderData?.address?.street + " " + orderData?.address?.city + " " + orderData?.address?.state + " " + orderData?.address?.zipCode}</p>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;