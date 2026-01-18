import { BiPhone } from "react-icons/bi";
import ButtonAction from "../../../shared/ui/ButtonAction";

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
            <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                    Detalles del Paquete
                </h2>
                <div className="space-y-3">
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Peso</p>
                        <p className="text-slate-100 font-semibold">{packageData?.data?.weight}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Dimensiones</p>
                        <p className="text-slate-100 font-semibold">
                            {packageData?.data?.dimensions}
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm mb-1">Origen</p>
                        <p className="text-slate-100 font-semibold">{packageData?.data?.origin}</p>
                    </div>
                </div>
            </div>

            {/* Delivery Contact */}
            <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                    Información de Contacto
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                            <BiPhone size={20} className="text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Servicio al Cliente</p>
                            <p className="text-slate-100 font-semibold">+57 941 540 352</p>
                        </div>
                    </div>
                    <ButtonAction
                        onClick={() => { }}
                        variant="secondary"
                        className="w-full"
                        text="Contactar Soporte"
                    >
                        <BiPhone size={20} className="text-cyan-400" />
                    </ButtonAction>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">
                    ¿Problema con tu envío?
                </h3>
                <p className="text-slate-300 text-xs mb-3">
                    Si tienes algún problema, contáctanos inmediatamente
                </p>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                    Reportar un problema →
                </button>
            </div>
        </div>
    );
};

export default PackageDetails;