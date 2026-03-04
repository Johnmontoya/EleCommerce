import { BiPhone } from "react-icons/bi";

interface PackageData {
    data: {
        origin: string;
        trackingNumber: string;
        orderNumber: string;
        carrier: string;
        estimatedDelivery: string;
        weight: string;
        dimensions: string;
    }
}

interface PackageDetailsProps {
    packageData: PackageData | null;
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ packageData }) => {
    return (
        <div className="space-y-6">
            {/* Package Info */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-zinc-700 opacity-50"></div>

                <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                    <span className="text-[#e4ff00]">&gt;</span> [PACKAGE_CONFIGURATION]
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[MASS]</span>
                        <span className="text-zinc-100 font-mono tracking-wider">{packageData?.data?.weight}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[GEOMETRY]</span>
                        <span className="text-zinc-100 font-mono tracking-wider">
                            {packageData?.data?.dimensions}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">[SOURCE_NODE]</span>
                        <span className="text-zinc-100 font-mono tracking-wider uppercase">{packageData?.data?.origin}</span>
                    </div>
                </div>
            </div>

            {/* Delivery Contact */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff] opacity-50"></div>

                <h2 className="text-sm font-mono tracking-widest uppercase text-zinc-100 mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                    <span className="text-[#00f0ff]">&gt;</span> [SUPPORT_CHANNEL]
                </h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-[#0a0a0a] border border-zinc-800 p-3">
                        <div className="w-10 h-10 border border-[#00f0ff]/30 bg-[#00f0ff]/10 flex items-center justify-center">
                            <BiPhone size={20} className="text-[#00f0ff]" />
                        </div>
                        <div>
                            <p className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-1">[HQ_COMM_LINK]</p>
                            <p className="text-[#00f0ff] font-mono tracking-wider drop-shadow-[0_0_5px_rgba(0,240,255,0.4)]">+57 941 540 352</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { }}
                        className="w-full h-12 flex items-center justify-center gap-2 border border-zinc-800 bg-[#0a0a0a] text-zinc-400 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all font-mono text-xs uppercase tracking-widest"
                    >
                        <BiPhone size={16} />
                        [CONNECT_SUPPORT]
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#ff0055]/5 border border-[#ff0055]/30 p-6 relative overflow-hidden group">
                {/* Warning Accent */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#ff0055]/50 group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>

                <h3 className="text-xs font-mono font-bold text-[#ff0055] tracking-widest uppercase mb-2">
                    [ ! ] REPORT_ANOMALY
                </h3>
                <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-4 leading-relaxed border-l border-[#ff0055]/30 pl-2">
                    IF LOGISTICS DATA APPEARS CORRUPTED OR SHIPMENT IS DELAYED BEYOND ACCEPTABLE PARAMETERS.
                </p>
                <button className="text-[#ff0055] hover:text-white hover:bg-[#ff0055] px-4 py-2 border border-[#ff0055] font-mono text-xs font-semibold transition-colors uppercase tracking-widest w-full">
                    [RAISE_TICKET]
                </button>
            </div>
        </div>
    );
};

export default PackageDetails;