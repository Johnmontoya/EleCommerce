import { BiPackage } from "react-icons/bi";
import type { TrackingData } from "../../types/tracking.types";

interface LogisticDimensionsProps {
    tracking: TrackingData;
    setTracking: (tracking: TrackingData) => void;
    getFieldsError: (fieldName: string) => string | undefined;
}

const LogisticDimensions: React.FC<LogisticDimensionsProps> = ({ tracking, setTracking, getFieldsError }) => {
    return (
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiPackage size={20} className="text-cyan-400" />
                Dimensiones y Logística
            </h2>

            <div className="grid grid-cols-2 gap-4 space-y-4">
                <div className="w-full">
                    <label className="block text-slate-300 mb-2">
                        Empresa de logística *
                    </label>
                    <select
                        value={tracking.tracking.carrier}
                        name="carrier"
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, carrier: e.target.value } })}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    >
                        <option value="" disabled>
                            {"Seleccione una categoría"}
                        </option>
                        <option value="ups">UPS (United Parcel Service)</option>
                        <option value="fedex">FedEx</option>
                        <option value="dhl">DHL</option>
                        <option value="usps">USPS</option>
                    </select>
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError("carrier")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-slate-300 mb-2">Tiempo de envio</label>
                    <input
                        type="date"
                        name="estimatedDelivery"
                        value={tracking.tracking.estimatedDelivery}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, estimatedDelivery: e.target.value } })}
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    />
                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError("estimatedDelivery")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Dirección de origen *
                    </label>
                    <input
                        type="text"
                        name="origin"
                        value={tracking.tracking.origin}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, origin: e.target.value } })}
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Seattle, WA, USA"
                    />

                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError("origin")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Dirección de destino *
                    </label>
                    <input
                        type="text"
                        name="destination"
                        value={tracking.tracking.destination}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, destination: e.target.value } })}
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="Austin, TX, USA"
                    />

                    <div className="text-red-500 text-sm mt-1">
                        {getFieldsError("destination")}
                    </div>
                </div>
                <div className="w-full flex flex-row gap-4">
                    <div className="w-44">
                        <label className="block text-slate-300 mb-2">
                            Peso (kg)
                        </label>
                        <input
                            type="text"
                            name="weight"
                            value={tracking.tracking.weight}
                            onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, weight: e.target.value } })}
                            required
                            className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                            placeholder="12.5"
                        />

                        <div className="text-red-500 text-sm mt-1">
                            {getFieldsError("weight")}
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-4">
                    <div className="w-96">
                        <label className="block text-slate-300 mb-2">Dimensiones (L × W × H cm)</label>
                        <div className="flex flex-col items-center gap-2">
                            <input
                                type="text"
                                name="dimensions"
                                value={tracking.tracking.dimensions}
                                onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, dimensions: e.target.value } })}
                                className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                                placeholder="45"
                            />
                            <div className="text-red-500 text-sm mt-1">
                                {getFieldsError("dimensions")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogisticDimensions