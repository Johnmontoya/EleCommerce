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
            fontSize: "15px",
            color: "#e2e8f0",
            fontFamily: "system-ui, sans-serif",
            "::placeholder": { color: "#475569" },
            iconColor: "#38bdf8",
        },
        invalid: { color: "#fb7185", iconColor: "#fb7185" },
        complete: { color: "#4ade80", iconColor: "#4ade80" },
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
        <div className="space-y-5">
            {/* Encabezado */}
            <div>
                <h2 className="text-xl font-semibold text-white">Datos de pago</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                    Conexión cifrada · Powered by Stripe
                </p>
            </div>

            {/* Resumen de dirección seleccionada */}
            {selectedAddress && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-sm">
                        <p className="text-slate-300 font-medium">
                            {selectedAddress.street} — {selectedAddress.city}
                        </p>
                        <p className="text-slate-500 mt-0.5">
                            {selectedAddress.street}, {selectedAddress.city},{" "}
                            {selectedAddress.state} {selectedAddress.zipCode}
                        </p>
                    </div>
                </div>
            )}

            {/* Titular + marcas de tarjeta */}
            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <span className="text-slate-500">Titular: </span>
                    <span className="text-slate-300 font-medium">{customerName}</span>
                </div>
                <div className="flex gap-1.5">
                    {["VISA", "MC", "AMEX"].map((brand) => (
                        <span
                            key={brand}
                            className="text-xs font-bold bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded-lg tracking-wide"
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>

            {/* Número de tarjeta */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    Número de tarjeta
                </label>
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30 transition-all">
                    <CardNumberElement
                        options={{ ...STRIPE_ELEMENT_STYLE, showIcon: true }}
                        onChange={(e) => setFieldComplete("number", e.complete)}
                    />
                </div>
            </div>

            {/* Expiración + CVC */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">
                        Expiración
                    </label>
                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30 transition-all">
                        <CardExpiryElement
                            options={STRIPE_ELEMENT_STYLE}
                            onChange={(e) => setFieldComplete("expiry", e.complete)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">CVC</label>
                    <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3.5 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30 transition-all">
                        <CardCvcElement
                            options={STRIPE_ELEMENT_STYLE}
                            onChange={(e) => setFieldComplete("cvc", e.complete)}
                        />
                    </div>
                </div>
            </div>

            {/* Error de pago */}
            {errorMessage && (
                <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-rose-400 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* Total a pagar */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-sky-500/10 border border-sky-500/20">
                <span className="text-slate-300 font-medium">Total a pagar</span>
                <span className="text-sky-400 font-bold text-xl">{fmt(total)}</span>
            </div>

            {/* Botones de navegación */}
            <div className="flex gap-3">
                <button
                    onClick={onBack}
                    disabled={isProcessing}
                    className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 disabled:opacity-40 font-medium transition-all text-sm"
                >
                    ← Volver
                </button>
                <button
                    onClick={processPayment}
                    disabled={isProcessing || !isFormComplete}
                    className="flex-[2] py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
                >
                    {isProcessing ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Pagar {fmt(total)}
                        </>
                    )}
                </button>
            </div>

            <p className="text-center text-slate-700 text-xs">
                Al pagar aceptas nuestros{" "}
                <a href="/terms" className="text-slate-600 hover:text-slate-400 underline underline-offset-2">
                    términos y condiciones
                </a>
            </p>
        </div>
    );
}