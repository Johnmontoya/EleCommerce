import { BiCreditCard } from "react-icons/bi";
import { FaCcAmex, FaCcMastercard, FaCcVisa } from "react-icons/fa";

interface Card {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}

interface CardMethodProps {
    cardData: Card;
    handleExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCvvChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCardData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedMethod: string;
}
const CardMethod = ({ cardData, handleExpiryChange, handleCardNumberChange, handleCvvChange, onChangeCardData, selectedMethod }: CardMethodProps) => {

    const getCardIcon = () => {
        if (!cardData.cardNumber) return <BiCreditCard size={24} className="text-slate-400" />;
        const firstDigit = cardData.cardNumber[0];
        if (firstDigit === '4') return <FaCcVisa size={32} className="text-blue-500" />;
        if (firstDigit === '5') return <FaCcMastercard size={32} className="text-orange-500" />;
        if (firstDigit === '3') return <FaCcAmex size={32} className="text-blue-400" />;

        return <BiCreditCard size={24} className="text-slate-400" />;
    };

    return (
        selectedMethod === "card" && (
            <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <BiCreditCard size={24} className="text-cyan-400" />
                    Detalles de la Tarjeta
                </h2>

                {/* Card Preview */}
                <div className="w-96  mx-auto bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl p-6 mb-6 shadow-xl">
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-white text-sm font-semibold">BANK CARD</div>
                        {getCardIcon()}
                    </div>
                    <div className="text-white text-xl tracking-wider mb-4 font-mono">
                        {cardData.cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-cyan-100 text-xs mb-1">TITULAR</p>
                            <p className="text-white font-semibold">
                                {cardData.cardHolder || "NOMBRE APELLIDO"}
                            </p>
                        </div>
                        <div>
                            <p className="text-cyan-100 text-xs mb-1">EXPIRA</p>
                            <p className="text-white font-semibold">
                                {cardData.expiryDate || "MM/AA"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Número de Tarjeta
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                            maxLength={19}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Nombre del Titular
                        </label>
                        <input
                            type="text"
                            name="cardHolder"
                            value={cardData.cardHolder}
                            onChange={onChangeCardData}
                            placeholder="Juan Pérez"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors uppercase"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Fecha de Expiración
                            </label>
                            <input
                                type="text"
                                name="expiryDate"
                                value={cardData.expiryDate}
                                onChange={handleExpiryChange}
                                placeholder="MM/AA"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                maxLength={5}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
                                CVV
                                <span className="text-xs text-slate-400">(Código de seguridad)</span>
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={cardData.cvv}
                                onChange={handleCvvChange}
                                placeholder="123"
                                className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                                maxLength={4}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CardMethod;