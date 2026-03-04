import { BiMapPin, BiTime } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";

interface PackageData {
    data: {
        origin: string;
        trackingNumber: string;
        orderNumber: string;
        carrier: string;
        estimatedDelivery: string;
        currentLocation: string;
        destination: string;
    }
}

interface CardStatusProps {
    packageData: PackageData | null;
}

const CardStatus: React.FC<CardStatusProps> = ({ packageData }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Current Status Card */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#00f0ff]/5 blur-2xl group-hover:bg-[#00f0ff]/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
                    <div className="w-12 h-12 border border-[#00f0ff]/30 bg-[#00f0ff]/10 flex items-center justify-center">
                        <MdLocalShipping size={24} className="text-[#00f0ff]" />
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[ESTADO_ACTUAL]</p>
                        <p className="text-xl font-bold text-[#00f0ff] font-mono uppercase tracking-wider">{packageData?.data?.origin}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">[ID_DE_SEGUIMIENTO]</span>
                        <span className="text-zinc-100 font-mono tracking-wider">
                            {packageData?.data?.trackingNumber}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">[REFERENCIA_DE_ORDEN]</span>
                        <span className="text-zinc-100 font-mono tracking-wider">
                            {packageData?.data?.orderNumber}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">[SISTEMA_DE_TRANSPORTE]</span>
                        <span className="text-zinc-100 font-mono tracking-wider uppercase">
                            {packageData?.data?.carrier}
                        </span>
                    </div>
                </div>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-[#050505] border border-zinc-800 p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#e4ff00]/5 blur-2xl group-hover:bg-[#e4ff00]/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-6 border-b border-zinc-800 pb-4">
                    <div className="w-12 h-12 border border-[#e4ff00]/30 bg-[#e4ff00]/10 flex items-center justify-center">
                        <BiTime size={24} className="text-[#e4ff00]" />
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[TIEMPO_ESTIMADO]</p>
                        <p className="text-xl font-bold text-[#e4ff00] font-mono tracking-wider">
                            {packageData?.data?.estimatedDelivery}
                        </p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="border-b border-zinc-900 pb-3">
                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[NODO_ORIGEN]</p>
                        <p className="text-zinc-100 font-mono tracking-wider flex items-center gap-3 uppercase">
                            <BiMapPin size={16} className="text-[#00f0ff]" />
                            {packageData?.data?.origin}
                        </p>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">[DESTINO]</p>
                        <p className="text-zinc-100 font-mono tracking-wider flex items-center gap-3 uppercase">
                            <IoLocationSharp size={16} className="text-[#e4ff00]" />
                            {packageData?.data?.destination}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardStatus;