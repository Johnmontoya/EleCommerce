
interface CardFacturationProps {
    paymentData: any;
    onChangePaymentData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardFacturation: React.FC<CardFacturationProps> = ({
    paymentData,
    onChangePaymentData,
}) => {
    return (
        <div className="bg-slate-800/50 border-2 border-slate-700 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
                Información de Facturación
            </h2>

            <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Nombre Completo *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={paymentData.fullName}
                            onChange={onChangePaymentData}
                            placeholder="Juan Pérez García"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={paymentData.email}
                            onChange={onChangePaymentData}
                            placeholder="correo@ejemplo.com"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Teléfono *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={paymentData.phone}
                        onChange={onChangePaymentData}
                        placeholder="+57 300 123 4567"
                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Dirección *
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={paymentData.address}
                        onChange={onChangePaymentData}
                        placeholder="Calle 123 #45-67"
                        className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Ciudad
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={paymentData.city}
                            onChange={onChangePaymentData}
                            placeholder="Bogotá"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Código Postal
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            value={paymentData.zipCode}
                            onChange={onChangePaymentData}
                            placeholder="110111"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            País
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={paymentData.country}
                            onChange={onChangePaymentData}
                            placeholder="Tu pais"
                            className="w-full bg-slate-700 border-2 border-slate-600 text-slate-100 px-4 py-3 rounded-lg outline-none focus:border-cyan-500 transition-colors"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardFacturation;