import { BiMapPin } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";

const MapSection: React.FC = () => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <BiMapPin size={24} className="text-cyan-400" />
                Ubicación del Paquete
            </h2>
            <div className="relative h-80 bg-slate-700/50 rounded-xl overflow-hidden">
                {/* Mapa simulado con marcadores */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="w-full h-full" style={{
                            backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Route line */}
                    <svg className="absolute inset-0 w-full h-full">
                        <defs>
                            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 80 320 Q 200 200, 320 240 T 560 180"
                            stroke="url(#routeGradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="10,5"
                            className="animate-pulse"
                        />
                    </svg>

                    {/* Origin marker */}
                    <div className="absolute left-20 bottom-10 transform -translate-x-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping absolute"></div>
                            <div className="w-4 h-4 bg-cyan-500 rounded-full relative"></div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-xs text-cyan-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                    Origen
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Current location marker (animated) */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative animate-bounce">
                            <MdLocalShipping size={32} className="text-yellow-400" />
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                <p className="text-xs text-yellow-400 font-semibold bg-slate-900/90 px-2 py-1 rounded">
                                    En Tránsito
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Destination marker */}
                    <div className="absolute right-20 top-20 transform translate-x-1/2">
                        <div className="relative">
                            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
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