import { BiSearch } from "react-icons/bi";

interface TrackingInput {
    trackingNumber: string;
}

interface TrackingSearchProps {
    trackingLoading: boolean;
    setTrackingLoading: (trackingLoading: boolean) => void;
    onChangeTracking: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isTracking: TrackingInput;
}

const TrackingSearch: React.FC<TrackingSearchProps> = ({
    trackingLoading,
    setTrackingLoading,
    onChangeTracking,
    isTracking,
}) => {

    const handleTrackPackage = () => {
        if (!isTracking.trackingNumber.trim()) {
            return;
        }
        setTrackingLoading(true);
        // Simular búsqueda
        setTimeout(() => {
            setTrackingLoading(false);
        }, 1500);
    };

    return (
        <div className="bg-[#050505] border border-zinc-800 p-6 mb-8 relative group">
            {/* Neon Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-4 flex items-center gap-2">
                <span className="text-[#00f0ff]">&gt;</span> [INGRESA_ID_DE_SEGUIMIENTO]
            </h2>
            <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 relative flex items-center">
                    <BiSearch
                        size={18}
                        className="absolute left-4 text-zinc-500"
                    />
                    <input
                        type="text"
                        name="trackingNumber"
                        value={isTracking.trackingNumber}
                        onChange={onChangeTracking}
                        onKeyPress={(e) => e.key === "Enter" && handleTrackPackage()}
                        placeholder="TK-2026001234567_"
                        className="w-full bg-[#0a0a0a] border border-zinc-800 text-[#00f0ff] font-mono tracking-wider placeholder-zinc-700 px-12 py-4 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                    />
                </div>
                <button
                    onClick={handleTrackPackage}
                    disabled={trackingLoading || !isTracking.trackingNumber.trim()}
                    className="bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all px-8 py-4 font-mono text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {trackingLoading ? "[ESCANEANDO...]" : "[LOCALIZAR_ENVIO]"}
                </button>
            </div>
            <p className="text-zinc-600 font-mono text-[10px] mt-3 uppercase tracking-widest border-l border-[#00f0ff] pl-2">
                CONSULTA EL CORREO DE CONFIRMACIÓN DE ENVÍO PARA OBTENER LA SECUENCIA ID
            </p>
        </div>
    );
};

export default TrackingSearch;