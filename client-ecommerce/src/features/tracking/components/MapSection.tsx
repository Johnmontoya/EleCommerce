import { BiMapPin } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";

type TransitStatus =
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "REFUNDED";

interface StatusProps {
    status: TransitStatus;
}

const transit: { label: TransitStatus; coordenates: string }[] = [
    { label: "CONFIRMED", coordenates: "left-1/11 top-2/3" },
    { label: "PROCESSING", coordenates: "left-1/11 top-2/3" },
    { label: "SHIPPED", coordenates: "left-5/9 top-3/6" },
    { label: "DELIVERED", coordenates: "left-8/9 top-3/5" },
    { label: "CANCELLED", coordenates: "left-7/9 top-3/4" },
    { label: "REFUNDED", coordenates: "left-1/6 top-2/9" },
];

const MapSection: React.FC<StatusProps> = ({ status }) => {
    const currentTransit = transit.find(t => t.label === status);
    let markerPosition = currentTransit?.coordenates ?? "left-1/12 top-2/3";
    let position = "";
    if (status === "CANCELLED" || status === "REFUNDED") {
        position = "scale-x-[-1]";
    }

    return (
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <BiMapPin size={24} className="text-cyan-400" />
                Ubicación del Paquete
            </h2>

            <div className="relative h-80 bg-slate-700/50 rounded-xl overflow-hidden">
                {/* Fondo mapa */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    "linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)",
                                backgroundSize: "50px 50px",
                            }}
                        />
                    </div>

                    {/* Ruta */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="
                                M 5 15
                                C 20 2, 35 2, 50 15
                                S 80 28, 95 15
                                "
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="0.6"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Origen */}
                    <div className="absolute left-5 top-40 transform -translate-x-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute" />
                            <div className="w-4 h-4 bg-cyan-500 rounded-full relative" />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-xs text-cyan-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                    Origen
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Marcador dinámico */}
                    <div
                        className={`absolute ${markerPosition} transform -translate-x-1/2 -translate-y-1/2`}
                    >
                        <div className={`relative ${status === "DELIVERED" ? "" : "animate-bounce"}`}>
                            <MdLocalShipping size={32} className={`text-yellow-400 ${position}`} />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-xs text-yellow-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                    {status}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Destino */}
                    <div className="absolute right-6 top-36 transform translate-x-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-xs text-green-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                    Destino
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;
