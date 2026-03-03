// components/CheckoutForm/CheckoutForm.tsx
import { useState } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import { useStripePayment } from '../../hook/useStripePayment';

interface CheckoutFormProps {
    orderId: string;
    amount: number;           // En COP: 50000
    customerEmail: string;
    customerName: string;
    onPaymentSuccess: (paymentIntentId: string) => void;
    onPaymentError: (error: string) => void;
}

// Estilos para los elementos de Stripe (se adaptan a tu tema dark)
const STRIPE_ELEMENT_STYLE = {
    style: {
        base: {
            fontSize: '16px',
            color: '#e2e8f0',
            fontFamily: 'Inter, system-ui, sans-serif',
            '::placeholder': {
                color: '#64748b',
            },
            iconColor: '#22d3ee',
        },
        invalid: {
            color: '#f87171',
            iconColor: '#f87171',
        },
        complete: {
            color: '#4ade80',
            iconColor: '#4ade80',
        },
    },
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    orderId,
    amount,
    customerEmail,
    customerName,
    onPaymentSuccess,
    onPaymentError,
}) => {
    const [cardNumberComplete, setCardNumberComplete] = useState(false);
    const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
    const [cardCvcComplete, setCardCvcComplete] = useState(false);

    const isFormComplete = cardNumberComplete && cardExpiryComplete && cardCvcComplete;

    const { processPayment, isProcessing, errorMessage } = useStripePayment({
        orderId,
        amount,
        customerEmail,
        customerName,
        onSuccess: onPaymentSuccess,
        onError: onPaymentError,
    });

    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                <div className="p-2 bg-cyan-400/10 rounded-lg">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-slate-100 font-semibold">Datos de pago</h3>
                    <p className="text-slate-400 text-sm">Conexión segura con Stripe</p>
                </div>
                {/* Logos de tarjetas */}
                <div className="ml-auto flex gap-2 opacity-60">
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">VISA</span>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">MC</span>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">AMEX</span>
                </div>
            </div>

            {/* Campo: Número de tarjeta */}
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">
                    Número de tarjeta
                </label>
                <div className="bg-slate-900/60 border border-slate-600 rounded-lg px-4 py-3 focus-within:border-cyan-400 transition-colors">
                    <CardNumberElement
                        options={{
                            ...STRIPE_ELEMENT_STYLE,
                            showIcon: true,
                            placeholder: '1234 5678 9012 3456',
                        }}
                        onChange={(e) => setCardNumberComplete(e.complete)}
                    />
                </div>
            </div>

            {/* Fila: Fecha + CVC */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">
                        Fecha de expiración
                    </label>
                    <div className="bg-slate-900/60 border border-slate-600 rounded-lg px-4 py-3 focus-within:border-cyan-400 transition-colors">
                        <CardExpiryElement
                            options={{
                                ...STRIPE_ELEMENT_STYLE,
                                placeholder: 'MM / AA',
                            }}
                            onChange={(e) => setCardExpiryComplete(e.complete)}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">
                        CVC
                    </label>
                    <div className="bg-slate-900/60 border border-slate-600 rounded-lg px-4 py-3 focus-within:border-cyan-400 transition-colors">
                        <CardCvcElement
                            options={{
                                ...STRIPE_ELEMENT_STYLE,
                                placeholder: '123',
                            }}
                            onChange={(e) => setCardCvcComplete(e.complete)}
                        />
                    </div>
                </div>
            </div>

            {/* Error de pago */}
            {errorMessage && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
            )}

            {/* Resumen del pago */}
            <div className="bg-slate-900/40 rounded-lg px-4 py-3 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total a pagar</span>
                <span className="text-slate-100 font-bold text-lg">
                    ${amount.toLocaleString('es-CO')} COP
                </span>
            </div>

            {/* Botón de pago */}
            <button
                onClick={processPayment}
                disabled={isProcessing || !isFormComplete}
                className={`
                    w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200
                    flex items-center justify-center gap-2
                    ${isProcessing || !isFormComplete
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-900 active:scale-[0.98]'
                    }
                `}
            >
                {isProcessing ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Procesando pago...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pagar ${amount.toLocaleString('es-CO')} COP
                    </>
                )}
            </button>

            {/* Nota de seguridad */}
            <p className="text-center text-slate-500 text-xs flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Pago seguro encriptado con SSL · Powered by Stripe
            </p>
        </div>
    );
};

export default CheckoutForm;