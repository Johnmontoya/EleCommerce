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
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
                Ingresa tu número de rastreo
            </h2>
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <BiSearch
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        name="trackingNumber"
                        value={isTracking.trackingNumber}
                        onChange={onChangeTracking}
                        onKeyPress={(e) => e.key === "Enter" && handleTrackPackage()}
                        placeholder="Ej: TK-2026001234567"
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-10 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-3">
                Puedes encontrar tu número de rastreo en el email de confirmación
            </p>
        </div>
    );
};

export default TrackingSearch;