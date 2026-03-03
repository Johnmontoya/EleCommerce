// src/features/checkout/components/AddressStep.tsx
import type { SavedAddress } from "../../types/checkout.types";

interface AddressStepProps {
    addresses: SavedAddress[];
    selectedAddressId: string;
    notes: string;
    isLoading: boolean;
    onSelectAddress: (id: string) => void;
    onNotesChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function AddressStep({
    addresses,
    selectedAddressId,
    notes,
    isLoading,
    onSelectAddress,
    onNotesChange,
    onNext,
    onBack,
}: AddressStepProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-mono">
            {/* Encabezado */}
            <div className="border-l-4 border-[#00f0ff] pl-3 mb-6">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    DESTINATION_SELECTION //
                </h2>
                <p className="text-zinc-500 text-xs tracking-widest mt-1 uppercase">
                    SYSTEM.LOCATE_SHIPPING_COORDINATES()
                </p>
            </div>

            {/* Lista de direcciones o estado vacío */}
            {addresses.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-800 bg-[#050505] relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-600" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-600" />

                    <svg className="w-12 h-12 mx-auto mb-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm tracking-widest text-zinc-500 uppercase">NO_COORDINATES_FOUND</p>
                    <a href="/profile/addresses" className="text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black hover:font-bold text-xs tracking-widest uppercase mt-4 inline-block border border-[#00f0ff] px-4 py-2 transition-all">
                        INITIALIZE_NEW_LOCATION
                    </a>
                </div>
            ) : (
                <div className="grid gap-3 max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#27272a transparent' }}>
                    {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                            <button
                                key={addr.id}
                                onClick={() => onSelectAddress(addr.id)}
                                className={`w-full text-left p-4 relative transition-all duration-150 group ${isSelected
                                    ? "bg-[#00f0ff]/5 border border-[#00f0ff]"
                                    : "bg-[#050505] border border-zinc-800 hover:border-zinc-500"
                                    }`}
                            >
                                {/* Marcadores Técnicos */}
                                {isSelected && (
                                    <>
                                        <div className="absolute top-0 left-0 w-2 h-2 bg-[#00f0ff]" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00f0ff]" />
                                    </>
                                )}

                                <div className="flex items-start gap-4">
                                    {/* Check Visual Estilo Hardware */}
                                    <div className={`mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? "bg-[#00f0ff]" : "bg-zinc-800 border border-zinc-700 group-hover:bg-zinc-700"
                                        }`}>
                                        {isSelected && (
                                            <div className="w-2 h-2 bg-black" />
                                        )}
                                    </div>

                                    {/* Datos de la dirección */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 flex-wrap mb-2">
                                            <span className={`font-bold tracking-wider text-sm ${isSelected ? "text-white" : "text-zinc-300"
                                                }`}>
                                                {addr.street}
                                            </span>
                                            <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 tracking-widest uppercase">
                                                ID: {addr.city.substring(0, 3)}
                                            </span>
                                        </div>
                                        <p className="text-zinc-500 text-xs tracking-wider leading-relaxed uppercase">
                                            {addr.street} // {addr.city} // {addr.state} // {addr.zipCode}
                                        </p>
                                        <p className="text-zinc-600 text-[10px] tracking-widest mt-2 uppercase">
                                            COMM_LINK: {addr.phone}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Agregar nueva dirección */}
            <a
                href="/profile/addresses"
                className="flex items-center gap-2 text-xs tracking-widest text-zinc-500 hover:text-[#00f0ff] transition-colors w-fit border-b border-transparent hover:border-[#00f0ff] pb-0.5 uppercase"
            >
                [ + ] ADD_NEW_COORDINATES
            </a>

            {/* Notas del pedido */}
            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                <label className="text-xs font-bold tracking-widest text-zinc-400 flex items-center gap-2 uppercase">
                    <span className="w-2 h-2 bg-zinc-600" />
                    TRANSMISSION_NOTES <span className="text-zinc-600 text-[10px] font-normal">(OPTIONAL)</span>
                </label>
                <div className="relative">
                    <div className="absolute top-2 left-2 text-[#00f0ff] opacity-50 select-none pointer-events-none">&gt;</div>
                    <textarea
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        placeholder="ENTER DELIVERY INSTRUCTIONS HERE..."
                        rows={3}
                        className="w-full bg-[#020202] border border-zinc-800 px-6 py-3 text-zinc-300 text-xs placeholder-zinc-700 focus:outline-none focus:border-[#00f0ff] transition-colors resize-none uppercase font-mono tracking-wider"
                    />
                </div>
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-4 pt-2">
                <button
                    onClick={onBack}
                    disabled={isLoading}
                    className="flex-1 py-4 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 disabled:opacity-40 font-bold uppercase tracking-widest transition-all text-xs bg-[#050505]"
                >
                    [ RETURN ]
                </button>
                <button
                    onClick={onNext}
                    disabled={!selectedAddressId || isLoading}
                    className="flex-[2] relative group overflow-hidden bg-white text-black font-bold uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 transition-all hover:bg-[#00f0ff] hover:text-black disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-xs"
                >
                    {isLoading ? (
                        <>
                            <span className="w-2 h-2 bg-black animate-ping" />
                            PROCESSING...
                        </>
                    ) : (
                        <>
                            <span className="relative z-10">LOCK_COORDINATES // NEXT</span>
                            {/* Tech scanline effect on hover */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}