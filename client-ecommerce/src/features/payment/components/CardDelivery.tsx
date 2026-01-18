import { BiCheckCircle } from "react-icons/bi";

interface CardDeliveryProps {
    selectedMethod: string;
}

const CardDelivery: React.FC<CardDeliveryProps> = ({ selectedMethod }) => {
    return (
        selectedMethod === "cash" && (
            <div className="dash-search dark:dash-search border border-slate-600 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                    Pago Contra Entrega
                </h2>
                <div className="bg-cyan-500/10 border border-cyan-500/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <BiCheckCircle size={24} className="text-cyan-400 shrink-0 mt-1" />
                        <div>
                            <p className="text-slate-200 font-semibold mb-2">
                                Información importante
                            </p>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• Pagarás en efectivo al recibir tu pedido</li>
                                <li>• Prepara el monto exacto para facilitar la entrega</li>
                                <li>• Nuestro repartidor llevará cambio disponible</li>
                                <li>• Recibirás tu factura al momento de la entrega</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CardDelivery;