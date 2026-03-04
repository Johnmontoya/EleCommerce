import { BiCreditCard } from "react-icons/bi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

type PaymentMethod = "card" | "cash" | "online";

interface SelectMethodProps {
    selectedMethod: string;
    setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

const SelectMethod: React.FC<SelectMethodProps> = ({ selectedMethod, setSelectedMethod }) => {
    return (
        <div className="border border-zinc-800 bg-[#050505] p-6 relative">
            <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-6">
                [SELECT_TRANSACTION_METHOD]
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Credit/Debit Card */}
                <button
                    onClick={() => setSelectedMethod("card")}
                    className={`p-4 border transition-all text-left flex flex-col items-start ${selectedMethod === "card"
                        ? "border-[#00f0ff] bg-[#00f0ff]/10"
                        : "border-zinc-800 bg-black hover:border-[#00f0ff]/50"
                        }`}
                >
                    <BiCreditCard size={32} className={selectedMethod === "card" ? "text-[#00f0ff]" : "text-zinc-500"} />
                    <p className={`mt-2 font-bold uppercase tracking-widest text-sm ${selectedMethod === "card" ? "text-white" : "text-zinc-400"}`}>
                        [TARJETA_DE_CREDITO]
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">Débito & Crédito Soportadas</p>
                </button>

                {/* Cash on Delivery */}
                <button
                    onClick={() => setSelectedMethod("cash")}
                    className={`p-4 border transition-all text-left flex flex-col items-start ${selectedMethod === "cash"
                        ? "border-[#e4ff00] bg-[#e4ff00]/10"
                        : "border-zinc-800 bg-black hover:border-[#e4ff00]/50"
                        }`}
                >
                    <MdOutlineAccountBalanceWallet size={32} className={selectedMethod === "cash" ? "text-[#e4ff00]" : "text-zinc-500"} />
                    <p className={`mt-2 font-bold uppercase tracking-widest text-sm ${selectedMethod === "cash" ? "text-white" : "text-zinc-400"}`}>
                        [PAGO_CONTRA_ENTREGA]
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">Transacciones en Efectivo Únicamente</p>
                </button>

                {/* Online Payment */}
                <button
                    onClick={() => setSelectedMethod("online")}
                    className={`p-4 border transition-all text-left flex flex-col items-start ${selectedMethod === "online"
                        ? "border-[#ff0055] bg-[#ff0055]/10"
                        : "border-zinc-800 bg-black hover:border-[#ff0055]/50"
                        }`}
                >
                    <RiSecurePaymentLine size={32} className={selectedMethod === "online" ? "text-[#ff0055]" : "text-zinc-500"} />
                    <p className={`mt-2 font-bold uppercase tracking-widest text-sm ${selectedMethod === "online" ? "text-white" : "text-zinc-400"}`}>
                        [PAGO_SEGURO_EN_LINEA]
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">PSE, Nequi & Terceros</p>
                </button>
            </div>
        </div>
    );
};

export default SelectMethod;