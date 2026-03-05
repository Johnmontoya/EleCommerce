import { BiCheckCircle } from "react-icons/bi";

interface CardDeliveryProps {
    selectedMethod: string;
}

const CardDelivery: React.FC<CardDeliveryProps> = ({ selectedMethod }) => {
    return (
        selectedMethod === "cash" && (
            <div className="border border-zinc-800 bg-[#050505] p-6 relative mt-6">
                <h2 className="text-[#e4ff00] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#e4ff00] mb-6">
                    [PAGO_CONTRA_ENTREGA]
                </h2>
                <div className="bg-black border border-[#e4ff00]/30 p-6 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#e4ff00]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#e4ff00]" />
                    <div className="flex items-start gap-4">
                        <BiCheckCircle size={24} className="text-[#e4ff00] shrink-0 mt-1" />
                        <div>
                            <p className="text-white font-bold uppercase tracking-widest text-xs mb-3">
                                [INFORMACION_IMPORTANTE]
                            </p>
                            <ul className="text-zinc-400 font-mono text-xs space-y-2 uppercase">
                                <li>&gt; PAGARÁS EN EFECTIVO AL RECIBIR TU PEDIDO</li>
                                <li>&gt; PREPARA EL MONTO EXACTO PARA FACILITAR LA ENTREGA</li>
                                <li>&gt; NUESTRO REPARTIDOR LLEVARÁ CAMBIO DISPONIBLE</li>
                                <li>&gt; RECIBIRÁS TU FACTURA AL MOMENTO DE LA ENTREGA</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CardDelivery;