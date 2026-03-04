// src/features/checkout/components/PaymentStep.tsx
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { useStripePayment } from "../../hook/useStripePayment";
import type { SavedAddress } from "../../types/checkout.types";

const fmt = (n: number) =>
    "$" + n.toLocaleString("es-MX", { minimumFractionDigits: 2 });

const STRIPE_ELEMENT_STYLE = {
    style: {
        base: {
            fontSize: "14px",
            color: "#e5e7eb",
            fontFamily: "'JetBrains Mono', monospace",
            "::placeholder": { color: "#475569" },
            iconColor: "#00f0ff",
            letterSpacing: "0.1em"
        },
        invalid: { color: "#ff0055", iconColor: "#ff0055" },
        complete: { color: "#e4ff00", iconColor: "#e4ff00" },
    },
};

interface PaymentStepProps {
    orderId: string;
    total: number;
    customerEmail: string;
    customerName: string;
    selectedAddress: SavedAddress | null;
    onSuccess: (paymentIntentId: string) => void;
    onBack: () => void;
}

export function PaymentStep({
    orderId,
    total,
    customerEmail,
    customerName,
    selectedAddress,
    onSuccess,
    onBack,
}: PaymentStepProps) {
    const {
        isProcessing,
        isFormComplete,
        errorMessage,
        setFieldComplete,
        processPayment,
    } = useStripePayment({
        orderId,
        amount: total,
        customerEmail,
        customerName,
        billingAddress: selectedAddress
            ? {
                street: selectedAddress.street,
                city: selectedAddress.city,
                state: selectedAddress.state,
                zipCode: selectedAddress.zipCode,
            }
            : undefined,
        onSuccess,
        onError: () => { },
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 font-mono">
            {/* Encabezado */}
            <div className="border-l-4 border-[#00f0ff] pl-3 mb-6">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    PASARELA_DE_PAGO_SEGURO //
                </h2>
                <p className="text-zinc-500 text-xs tracking-widest mt-1 uppercase">
                    ESTABLECIENDO_CONEXION_ENCRIPTADA
                </p>
            </div>

            {/* Resumen de dirección seleccionada */}
            {selectedAddress && (
                <div className="flex items-start gap-3 p-4 bg-[#050505] border border-zinc-800 relative">
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-600" />

                    <svg className="w-5 h-5 text-[#00f0ff] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-xs">
                        <p className="text-zinc-300 font-bold tracking-wider uppercase">
                            UBICACION_DESTINO // {selectedAddress.city}
                        </p>
                        <p className="text-zinc-500 mt-1 uppercase tracking-widest">
                            {selectedAddress.street}, {selectedAddress.city},{" "}
                            {selectedAddress.state} {selectedAddress.zipCode}
                        </p>
                    </div>
                </div>
            )}

            {/* Titular + marcas de tarjeta */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="text-xs tracking-widest uppercase">
                    <span className="text-zinc-500">SUJETO_DE_AUTORIZACION: </span>
                    <span className="text-white font-bold">{customerName}</span>
                </div>
                <div className="flex gap-2">
                    {["VISA", "MC", "AMEX"].map((brand) => (
                        <span
                            key={brand}
                            className="text-[10px] font-bold bg-[#0a0a0a] border border-zinc-700 text-zinc-400 px-2 py-0.5 tracking-widest"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            {/* Número de tarjeta */}
            <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest text-zinc-400 flex items-center gap-2 uppercase">
                    <span className="w-2 h-2 bg-zinc-600" />
                    CREDENTIALES_DE_TARJETA
                </label>
                <div className="bg-[#020202] border border-zinc-700 p-4 focus-within:border-[#00f0ff] transition-all relative">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-[#00f0ff] opacity-0 focus-within:opacity-100" />
                    <CardNumberElement
                        options={{ ...STRIPE_ELEMENT_STYLE, showIcon: true }}
                        onChange={(e) => setFieldComplete("number", e.complete)}
                    />
                </div>
            </div>

            {/* Expiración + CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                        FECHA_DE_EXPIRACION
                    </label>
                    <div className="bg-[#020202] border border-zinc-700 p-4 focus-within:border-[#00f0ff] transition-all">
                        <CardExpiryElement
                            options={STRIPE_ELEMENT_STYLE}
                            onChange={(e) => setFieldComplete("expiry", e.complete)}
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-bold tracking-widest text-zinc-400 uppercase">CODIGO_DE_SEGURIDAD</label>
                    <div className="bg-[#020202] border border-zinc-700 p-4 focus-within:border-[#00f0ff] transition-all">
                        <CardCvcElement
                            options={STRIPE_ELEMENT_STYLE}
                            onChange={(e) => setFieldComplete("cvc", e.complete)}
                        />
                    </div>
                </div>
            </div>

            {/* Error de pago */}
            {errorMessage && (
                <div className="flex items-start gap-3 bg-[#110000] border border-[#ff0055] p-4 relative">
                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#ff0055]" />
                    <svg className="w-5 h-5 text-[#ff0055] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-[#ff0055] text-xs font-bold tracking-widest uppercase">ERROR_DE_AUTORIZACION</p>
                        <p className="text-zinc-400 text-[10px] tracking-wider uppercase mt-1">{errorMessage}</p>
                    </div>
                </div>
            )}

            {/* Total a pagar */}
            <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border-y border-zinc-800 my-4">
                <span className="text-zinc-400 text-xs font-bold tracking-widest uppercase">TOTAL_DE_LA_TRANSACCION</span>
                <span className="text-[#00f0ff] font-bold text-2xl tracking-wider">{fmt(total)}</span>
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-4 pt-4">
                <button
                    onClick={onBack}
                    disabled={isProcessing}
                    className="flex-1 py-4 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 disabled:opacity-40 font-bold uppercase tracking-widest transition-all text-xs bg-[#050505]"
                >
                    [ REGRESAR ]
                </button>
                <button
                    onClick={processPayment}
                    disabled={isProcessing || !isFormComplete}
                    className="flex-[2] relative group overflow-hidden bg-[#00f0ff] text-black font-bold uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-black disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-xs"
                >
                    {isProcessing ? (
                        <>
                            <span className="w-2 h-2 bg-black animate-ping" />
                            AUTORIZANDO...
                        </>
                    ) : (
                        <>
                            <span className="relative z-10">EJECUTAR_PAGO // {fmt(total)}</span>
                            {/* Tech scanline effect on hover */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]" />
                        </>
                    )}
                </button>
            </div>

            <p className="text-center text-zinc-600 text-[10px] tracking-widest uppercase mt-4">
                LOG_DEL_SISTEMA: CUMPLIENDO_CON_POLÍTICAS_Y{" "}
                <a href="/terms" className="text-zinc-400 hover:text-[#00f0ff] border-b border-transparent hover:border-[#00f0ff]">
                    TÉRMINOS_DE_SERVICIO
                </a>
            </p>
        </div>
    );
}