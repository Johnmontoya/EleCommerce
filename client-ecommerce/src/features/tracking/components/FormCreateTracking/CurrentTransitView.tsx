import { BiMapPin } from "react-icons/bi";

const CurrentTransitView: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>

            <div className="pb-4 border-b border-zinc-800 flex items-center gap-2 mb-6">
                <div className="w-5 h-5 flex items-center justify-center text-xs border border-[#00f0ff] bg-[#00f0ff]/10">
                    <BiMapPin className="w-3 h-3 text-[#00f0ff]" />
                </div>
                <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100">[RADAR_DE_TRANSITO]</h2>
            </div>

            <div className="relative h-64 bg-[#050505] border border-zinc-800 overflow-hidden">
                {/* Simple Map Representation */}
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                        <path d="M50,150 Q150,100 250,150 T450,150" stroke="#00f0ff" strokeWidth="1" fill="none" strokeDasharray="3,3" />
                        <path d="M100,50 L100,250" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                        <path d="M200,50 L200,250" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                        <path d="M300,50 L300,250" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                        <path d="M0,100 L400,100" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                        <path d="M0,200 L400,200" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                </div>

                {/* Radar Sweep */}
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_70%,rgba(0,240,255,0.1)_100%)] rounded-full animate-spin [animation-duration:4s]"></div>

                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#e4ff00] animate-ping absolute"></div>
                        <div className="w-2 h-2 bg-[#e4ff00] relative z-10"></div>
                        {/* Target Reticle */}
                        <div className="absolute w-8 h-8 border border-[#e4ff00]/50 rounded-none"></div>
                        <div className="absolute w-full h-[1px] bg-[#e4ff00]/50"></div>
                        <div className="absolute w-[1px] h-full bg-[#e4ff00]/50"></div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 focus-within:ring-1 focus-within:ring-[#00f0ff]">
                    <div className="bg-black/90 border border-zinc-800 p-2 flex items-center gap-3 backdrop-blur-sm">
                        <div className="bg-[#e4ff00]/10 border border-[#e4ff00] p-1">
                            <BiMapPin className="w-3 h-3 text-[#e4ff00]" />
                        </div>
                        <span className="font-mono text-xs text-[#00f0ff] tracking-widest uppercase truncate">[GEO_LOCK] CERCA DEL CENTRO DE DISTRIBUCIÓN DE OKLAHOMA CITY</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentTransitView;