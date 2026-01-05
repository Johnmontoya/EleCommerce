import Nequi from "../../../assets/images/nequi.png";
import Pse from "../../../assets/images/pse.png";
import Davidplata from "../../../assets/images/davidplata.png";
import paypal from "../../../assets/images/paypal.png";

interface CardOnlineProps {
    selectedMethod: string;
}

const CardOnline: React.FC<CardOnlineProps> = ({ selectedMethod }) => {
    return (
        selectedMethod === "online" && (
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4">
                    Pago en Línea
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="h-28 p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg hover:border-cyan-500 transition-all">
                        <img src={`${Pse}`} alt="PSE" className="mx-auto h-18" />
                        <p className="text-slate-300 text-sm">PSE</p>
                    </button>
                    <button className="h-28 p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg hover:border-cyan-500 transition-all">
                        <img src={`${Nequi}`} alt="Nequi" className="mx-auto h-18" />
                        <p className="text-slate-300 text-sm">Nequi</p>
                    </button>
                    <button className="h-28 p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg hover:border-cyan-500 transition-all">
                        <img src={`${Davidplata}`} alt="Daviplata" className="mx-auto h-18" />
                        <p className="text-slate-300 text-sm">Daviplata</p>
                    </button>
                    <button className="h-28 p-4 bg-slate-700/50 border-2 border-slate-600 rounded-lg hover:border-cyan-500 transition-all">
                        <img src={`${paypal}`} alt="PayPal" className="mx-auto h-18" />
                        <p className="text-slate-300 text-sm">PayPal</p>
                    </button>
                </div>
            </div>
        )
    );
};

export default CardOnline;