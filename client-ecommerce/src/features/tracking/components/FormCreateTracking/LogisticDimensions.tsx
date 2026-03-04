import { BiPackage } from "react-icons/bi";
import type { TrackingData } from "../../types/tracking.types";

interface LogisticDimensionsProps {
    tracking: TrackingData;
    setTracking: (tracking: TrackingData) => void;
    getFieldsError: (fieldName: string) => string | undefined;
}

const LogisticDimensions: React.FC<LogisticDimensionsProps> = ({ tracking, setTracking, getFieldsError }) => {
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>

            <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <BiPackage size={18} className="text-[#00f0ff]" />
                [LOGISTICS_AND_DIMENSIONS]
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [LOGISTICS_CARRIER] *
                    </label>
                    <select
                        value={tracking.tracking.carrier}
                        name="carrier"
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, carrier: e.target.value } })}
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all appearance-none cursor-pointer"
                    >
                        <option value="" disabled className="bg-black text-zinc-600">
                            [SELECT_CARRIER]
                        </option>
                        <option value="ups" className="bg-black">[UPS]</option>
                        <option value="fedex" className="bg-black">[FEDEX]</option>
                        <option value="dhl" className="bg-black">[DHL]</option>
                        <option value="usps" className="bg-black">[USPS]</option>
                    </select>
                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("carrier")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [EST_DELIVERY_CYCLE]
                    </label>
                    <input
                        type="date"
                        name="estimatedDelivery"
                        value={tracking.tracking.estimatedDelivery}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, estimatedDelivery: e.target.value } })}
                        className="w-full bg-[#050505] border border-zinc-800 text-[#00f0ff] font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all"
                    />
                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("estimatedDelivery")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [ORIGIN_NODE] *
                    </label>
                    <input
                        type="text"
                        name="origin"
                        value={tracking.tracking.origin}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, origin: e.target.value } })}
                        required
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                        placeholder="[AWAITING_INPUT]"
                    />

                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("origin")}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [DESTINATION_NODE] *
                    </label>
                    <input
                        type="text"
                        name="destination"
                        value={tracking.tracking.destination}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, destination: e.target.value } })}
                        required
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                        placeholder="[AWAITING_INPUT]"
                    />

                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("destination")}
                    </div>
                </div>
                <div className="w-full border-r border-zinc-900 pr-4">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [MASS_KG]
                    </label>
                    <input
                        type="text"
                        name="weight"
                        value={tracking.tracking.weight}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, weight: e.target.value } })}
                        required
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                        placeholder="0.00"
                    />

                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("weight")}
                    </div>
                </div>
                <div className="w-full pl-0 md:pl-2">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [GEOMETRY_LWH_CM]
                    </label>
                    <input
                        type="text"
                        name="dimensions"
                        value={tracking.tracking.dimensions}
                        onChange={(e) => setTracking({ ...tracking, tracking: { ...tracking.tracking, dimensions: e.target.value } })}
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-100 font-mono tracking-wider placeholder-zinc-700 px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all shadow-inner"
                        placeholder="0x0x0"
                    />
                    <div className="text-[#ff0055] font-mono text-[10px] tracking-widest uppercase mt-2">
                        {getFieldsError("dimensions")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogisticDimensions