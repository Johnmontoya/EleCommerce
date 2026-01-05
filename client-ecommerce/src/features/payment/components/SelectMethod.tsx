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
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
                Selecciona tu método de pago
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Credit/Debit Card */}
                <button
                    onClick={() => setSelectedMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedMethod === "card"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                        }`}
                >
                    <BiCreditCard size={32} className={selectedMethod === "card" ? "text-cyan-400" : "text-slate-400"} />
                    <p className={`mt-2 font-semibold ${selectedMethod === "card" ? "text-cyan-400" : "text-slate-300"}`}>
                        Tarjeta
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Crédito o Débito</p>
                </button>

                {/* Cash on Delivery */}
                <button
                    onClick={() => setSelectedMethod("cash")}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedMethod === "cash"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                        }`}
                >
                    <MdOutlineAccountBalanceWallet size={32} className={selectedMethod === "cash" ? "text-cyan-400" : "text-slate-400"} />
                    <p className={`mt-2 font-semibold ${selectedMethod === "cash" ? "text-cyan-400" : "text-slate-300"}`}>
                        Contra Entrega
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Pagar en efectivo</p>
                </button>

                {/* Online Payment */}
                <button
                    onClick={() => setSelectedMethod("online")}
                    className={`p-4 rounded-xl border-2 transition-all ${selectedMethod === "online"
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                        }`}
                >
                    <RiSecurePaymentLine size={32} className={selectedMethod === "online" ? "text-cyan-400" : "text-slate-400"} />
                    <p className={`mt-2 font-semibold ${selectedMethod === "online" ? "text-cyan-400" : "text-slate-300"}`}>
                        Pago Online
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PSE, Nequi, etc.</p>
                </button>
            </div>
        </div>
    );
};

export default SelectMethod;