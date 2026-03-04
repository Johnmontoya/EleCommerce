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
            <div className="border border-zinc-800 bg-[#050505] p-6 relative mt-6">
                <h2 className="text-[#ff0055] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#ff0055] mb-6">
                    [SECURE_ONLINE_PAYMENT]
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="h-28 p-4 bg-black border border-zinc-800 hover:border-[#ff0055] hover:bg-[#ff0055]/5 transition-all outline-none flex flex-col items-center justify-center gap-3">
                        <img src={`${Pse}`} alt="PSE" className="mx-auto h-12 object-contain grayscale mix-blend-screen opacity-80" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">[ PSE ]</p>
                    </button>
                    <button className="h-28 p-4 bg-black border border-zinc-800 hover:border-[#ff0055] hover:bg-[#ff0055]/5 transition-all outline-none flex flex-col items-center justify-center gap-3">
                        <img src={`${Nequi}`} alt="Nequi" className="mx-auto h-12 object-contain grayscale mix-blend-screen opacity-80" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">[ NEQUI ]</p>
                    </button>
                    <button className="h-28 p-4 bg-black border border-zinc-800 hover:border-[#ff0055] hover:bg-[#ff0055]/5 transition-all outline-none flex flex-col items-center justify-center gap-3">
                        <img src={`${Davidplata}`} alt="Daviplata" className="mx-auto h-12 object-contain grayscale mix-blend-screen opacity-80" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">[ DAVIPLATA ]</p>
                    </button>
                    <button className="h-28 p-4 bg-black border border-zinc-800 hover:border-[#ff0055] hover:bg-[#ff0055]/5 transition-all outline-none flex flex-col items-center justify-center gap-3">
                        <img src={`${paypal}`} alt="PayPal" className="mx-auto h-12 object-contain grayscale mix-blend-screen opacity-80" />
                        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">[ PAYPAL ]</p>
                    </button>
                </div>
            </div>
        )
    );
};

export default CardOnline;