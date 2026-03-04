
interface CardFacturationProps {
    paymentData: any;
    onChangePaymentData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardFacturation: React.FC<CardFacturationProps> = ({
    paymentData,
    onChangePaymentData,
}) => {
    return (
        <div className="border border-zinc-800 bg-[#050505] p-6 relative mt-6">
            <h2 className="text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest pl-1 border-l-2 border-[#00f0ff] mb-6">
                [BILLING_INFORMATION]
            </h2>

            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                            [FULL_NAME] *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={paymentData.fullName}
                            onChange={onChangePaymentData}
                            placeholder="Ej. Jane Doe"
                            className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                            [EMAIL_ADDRESS] *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={paymentData.email}
                            onChange={onChangePaymentData}
                            placeholder="ejemplo@correo.com"
                            className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                        [PHONE_NUMBER] *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={paymentData.phone}
                        onChange={onChangePaymentData}
                        placeholder="+00 000 000 0000"
                        className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                    />
                </div>

                <div>
                    <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                        [STREET_ADDRESS] *
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={paymentData.address}
                        onChange={onChangePaymentData}
                        placeholder="Calle Principal #00-00"
                        className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                            [CITY]
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={paymentData.city}
                            onChange={onChangePaymentData}
                            placeholder="Ciudad"
                            className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700 uppercase"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                            [ZIP_CODE]
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            value={paymentData.zipCode}
                            onChange={onChangePaymentData}
                            placeholder="000000"
                            className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">
                            [COUNTRY]
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={paymentData.country}
                            onChange={onChangePaymentData}
                            placeholder="País"
                            className="w-full bg-black border border-zinc-800 text-white p-3 font-mono text-sm focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff] transition-all outline-none placeholder:text-zinc-700 uppercase"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardFacturation;