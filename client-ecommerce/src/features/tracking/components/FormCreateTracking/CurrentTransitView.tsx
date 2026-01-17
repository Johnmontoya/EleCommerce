import { BiMapPin } from "react-icons/bi";

const CurrentTransitView: React.FC = () => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <div className="p-4 border-b border-gray-800 flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center text-xs">
                    <BiMapPin className="w-4 h-4 text-orange-500" />
                </div>
                <h2 className="block text-slate-300 font-semibold">Vista Actual de Transito</h2>
            </div>

            <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-950">
                {/* Simple Map Representation */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                        <path d="M50,150 Q150,100 250,150 T450,150" stroke="#4b5563" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        <path d="M100,50 L100,250" stroke="#4b5563" strokeWidth="1" opacity="0.3" />
                        <path d="M200,50 L200,250" stroke="#4b5563" strokeWidth="1" opacity="0.3" />
                        <path d="M300,50 L300,250" stroke="#4b5563" strokeWidth="1" opacity="0.3" />
                    </svg>
                </div>

                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping absolute"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full relative z-10 shadow-lg shadow-blue-600/50"></div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
                        <BiMapPin className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-slate-300">Near Oklahoma City Hub</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentTransitView;