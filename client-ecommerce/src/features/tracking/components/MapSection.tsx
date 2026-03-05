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
    const markerPosition = currentTransit?.coordenates ?? "left-1/12 top-2/3";
    let position = "";
    if (status === "CANCELLED" || status === "REFUNDED") {
        position = "scale-x-[-1]";
    }

    return (
        <div className="bg-[#050505] border border-zinc-800 p-6 mb-8 relative">
            <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <BiMapPin size={18} className="text-[#e4ff00]" />
                [DATOS_DE_UBICACION_TELEMETRICA]
            </h2>

            <div className="relative h-80 bg-[#0a0a0a] border border-zinc-800 overflow-hidden">
                {/* Fondo mapa */}
                <div className="absolute inset-0 bg-[#020202]">
                    {/* Grid */}
                    <div className="absolute inset-0 opacity-30">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage:
                                    "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>

                    {/* Radar sweep effect */}
                    <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(0,240,255,0.4)_360deg)] animate-[spin_4s_linear_infinite] rounded-full mix-blend-screen pointer-events-none opacity-20"></div>

                    {/* Ruta */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="
                                M 5 15
                                L 30 15
                                L 50 10
                                L 70 20
                                L 95 15
                                "
                            fill="none"
                            stroke="#ff0055"
                            strokeWidth="0.4"
                            strokeDasharray="2 1"
                            className="animate-[dash_20s_linear_infinite]"
                        />
                    </svg>

                    {/* Origen */}
                    <div className="absolute left-5 top-40 transform -translate-x-1/2 z-10">
                        <div className="relative">
                            <div className="w-6 h-6 border border-[#00f0ff] rounded-none animate-ping absolute" />
                            <div className="w-6 h-6 border-2 border-[#00f0ff] bg-black flex items-center justify-center relative">
                                <div className="w-2 h-2 bg-[#00f0ff]"></div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-[10px] text-[#00f0ff] font-mono tracking-widest uppercase bg-black border border-[#00f0ff]/30 px-2 py-0.5 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                                    [NODO_ORIGEN]
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Marcador dinámico */}
                    <div
                        className={`absolute ${markerPosition} transform -translate-x-1/2 -translate-y-1/2 z-20`}
                    >
                        <div className={`relative ${status === "DELIVERED" ? "" : "animate-pulse"}`}>
                            <div className={`w-8 h-8 bg-black border border-[#e4ff00] flex items-center justify-center ${position}`}>
                                <MdLocalShipping size={20} className="text-[#e4ff00]" />
                            </div>
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-[10px] text-[#e4ff00] font-mono tracking-widest uppercase bg-black border border-[#e4ff00]/30 px-2 py-0.5 shadow-[0_0_10px_rgba(228,255,0,0.3)]">
                                    [{status}]
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Destino */}
                    <div className="absolute right-6 top-36 transform translate-x-1/2 z-10">
                        <div className="relative">
                            <div className="w-6 h-6 border-2 border-zinc-600 bg-black flex items-center justify-center relative">
                                <div className="w-2 h-2 bg-zinc-600 animate-pulse"></div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase bg-black border border-zinc-800 px-2 py-0.5">
                                    [NODO_DESTINO]
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
