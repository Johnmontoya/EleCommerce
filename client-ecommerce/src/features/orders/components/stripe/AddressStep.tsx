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
        <div className="space-y-5">
            {/* Encabezado */}
            <div>
                <h2 className="text-xl font-semibold text-white">Dirección de envío</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                    Selecciona dónde recibirás tu pedido
                </p>
            </div>

            {/* Lista de direcciones o estado vacío */}
            {addresses.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                    <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm">No tienes direcciones guardadas.</p>
                    <a href="/profile/addresses" className="text-sky-400 text-sm hover:underline mt-1 inline-block">
                        + Agregar dirección
                    </a>
                </div>
            ) : (
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                    {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                            <button
                                key={addr.id}
                                onClick={() => onSelectAddress(addr.id)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-150 ${isSelected
                                    ? "border-sky-500 bg-sky-500/10 ring-1 ring-sky-500/30"
                                    : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Radio visual */}
                                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? "border-sky-500 bg-sky-500" : "border-slate-600"
                                        }`}>
                                        {isSelected && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>

                                    {/* Datos de la dirección */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className={`font-semibold text-sm ${isSelected ? "text-sky-300" : "text-slate-200"
                                                }`}>
                                                {addr.street}
                                            </span>
                                            <span className="text-xs text-slate-500 bg-slate-700/60 px-2 py-0.5 rounded-full">
                                                {addr.city}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                                        </p>
                                        <p className="text-slate-600 text-xs mt-0.5">
                                            Tel: {addr.phone}
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
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-sky-400 transition-colors w-fit"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar nueva dirección
            </a>

            {/* Notas del pedido */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Notas para el pedido
                    <span className="text-slate-600 font-normal">(opcional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    placeholder="Ej: Dejar con el portero, tocar el timbre 2 veces..."
                    rows={3}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-colors resize-none"
                />
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    disabled={isLoading}
                    className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 disabled:opacity-40 font-medium transition-all text-sm"
                >
                    ← Volver
                </button>
                <button
                    onClick={onNext}
                    disabled={!selectedAddressId || isLoading}
                    className="flex-[2] py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold transition-all active:scale-[0.98] text-sm flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Preparando orden...
                        </>
                    ) : (
                        <>
                            Continuar al pago
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}