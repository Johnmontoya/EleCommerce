import { BiPackage } from "react-icons/bi";

interface GeneralInformationProps {
    tracking: any;
    onChangeCreateData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ tracking, onChangeCreateData }) => {
    return (
        <div className="dash-search dark:dash-search border-2 border-slate-600 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <BiPackage size={20} className="text-cyan-400" />
                Información General
            </h2>
            <div className="flex flex-row gap-4 space-y-4">
                <div className="w-full">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Numero de envio *
                    </label>
                    <input
                        type="text"
                        name="trackingNumber"
                        value={tracking.tracking.trackingNumber}
                        onChange={onChangeCreateData}
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-emerald-600 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="TRK-7D83522A"
                        disabled
                    />
                </div>
                <div className="w-full">
                    <label className="block text-slate-300 font-semibold mb-2">
                        Orden de envio *
                    </label>
                    <input
                        type="text"
                        name="orderNumber"
                        value={tracking.tracking.orderNumber}
                        onChange={onChangeCreateData}
                        disabled
                        required
                        className="w-full bg-slate-700/50 border border-slate-600 text-slate-100 placeholder-slate-400 px-4 py-3 rounded-lg outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                        placeholder="1Z999AA10123456784"
                    />
                </div>
            </div>
        </div>
    );
};

export default GeneralInformation;