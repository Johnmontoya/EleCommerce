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
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                        <MdLocalShipping size={24} className="text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Estado Actual</p>
                        <p className="text-xl font-bold text-cyan-400">{packageData?.data?.origin}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-slate-400">Número de Rastreo</span>
                        <span className="text-slate-100 font-semibold">
                            {packageData?.data?.trackingNumber}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Número de Pedido</span>
                        <span className="text-slate-100 font-semibold">
                            {packageData?.data?.orderNumber}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-400">Transportadora</span>
                        <span className="text-slate-100 font-semibold">
                            {packageData?.data?.carrier}
                        </span>
                    </div>
                </div>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <BiTime size={24} className="text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Entrega Estimada</p>
                        <p className="text-xl font-bold text-green-400">
                            {packageData?.data?.estimatedDelivery}
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Ubicación Inicial</p>
                        <p className="text-slate-100 font-semibold flex items-center gap-2">
                            <BiMapPin size={16} className="text-cyan-400" />
                            {packageData?.data?.origin}
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Destino</p>
                        <p className="text-slate-100 font-semibold flex items-center gap-2">
                            <IoLocationSharp size={16} className="text-green-400" />
                            {packageData?.data?.destination}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardStatus;