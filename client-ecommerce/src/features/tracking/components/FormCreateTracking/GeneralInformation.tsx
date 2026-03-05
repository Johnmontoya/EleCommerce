import { BiPackage } from "react-icons/bi";

import type { TrackingData } from "../../types/tracking.types";

interface GeneralInformationProps {
    tracking: TrackingData;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ tracking, onChangeCreateData }) => {
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>

            <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <BiPackage size={18} className="text-[#00f0ff]" />
                [INFORMACIÓN_GENERAL]
            </h2>
            <div className="flex flex-col md:flex-row gap-6 space-y-0">
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [ID_DE_SEGUIMIENTO] *
                    </label>
                    <input
                        type="text"
                        name="trackingNumber"
                        value={tracking.tracking.trackingNumber}
                        onChange={onChangeCreateData}
                        required
                        className="w-full bg-[#050505] border border-zinc-800 text-[#00f0ff] font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                        placeholder="TRK-7D83522A"
                        disabled
                    />
                </div>
                <div className="w-full">
                    <label className="block text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2">
                        [REFERENCIA_DE_LA_ORDEN] *
                    </label>
                    <input
                        type="text"
                        name="orderNumber"
                        value={tracking.tracking.orderNumber}
                        onChange={onChangeCreateData}
                        disabled
                        required
                        className="w-full bg-[#050505] border border-zinc-800 text-zinc-300 font-mono tracking-wider px-4 py-3 outline-none focus:border-[#00f0ff] focus:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
                        placeholder="1Z999AA10123456784"
                    />
                </div>
            </div>
        </div>
    );
};

export default GeneralInformation;