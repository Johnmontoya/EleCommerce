// src/features/checkout/CheckoutPage.tsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCheckout } from "../../hook/useCheckout";
import { CheckoutStepper } from "../stripe/CheckoutStepper";
import { SummaryStep } from "../stripe/Summarystep";
import { AddressStep } from "../stripe/AddressStep";
import { PaymentStep } from "../stripe/PaymentStep";
import type {
    CartItem,
    SavedAddress,
    CheckoutPricing,
    CheckoutCustomer,
    CreateOrderResult,
} from "../../types/checkout.types";
import { useCartUpdateMutation } from "../../../cart/hook/mutation/useCartMutation";

// Stripe init fuera del componente para evitar re-inicializaciones
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const STRIPE_OPTIONS = {
    locale: "es" as const,
    appearance: {
        theme: "night" as const,
        variables: {
            colorPrimary: "#00f0ff",
            colorBackground: "#050505",
            colorText: "#e5e7eb",
            colorDanger: "#ff0055",
            fontFamily: "'JetBrains Mono', monospace",
            borderRadius: "0px",
            colorTextPlaceholder: "#4b5563",
        },
        rules: {
            '.Input': {
                border: '1px solid #27272a',
                boxShadow: 'none',
            },
            '.Input:focus': {
                border: '1px solid #00f0ff',
                boxShadow: 'none',
            },
        }
    },
};

// ─── Props públicas del feature ───────────────────────────────────────────────
interface CheckoutPageProps {
    stock: number[];
    cartItems: CartItem[];
    savedAddresses: SavedAddress[];
    customer: CheckoutCustomer;
    pricing: CheckoutPricing;
    onCreateOrder: (
        addressId: string,
        notes: string
    ) => Promise<CreateOrderResult>;
}

// ═════════════════════════════════════════════════════════════════════════════
// CheckoutPage — solo orquesta, sin lógica propia
// ═════════════════════════════════════════════════════════════════════════════
const CheckoutPage = ({
    stock,
    cartItems,
    savedAddresses,
    customer,
    pricing,
    onCreateOrder,
}: CheckoutPageProps) => {
    const updateCartMutation = useCartUpdateMutation()
    const {
        step,
        isCreatingOrder,
        selectedAddressId,
        notes,
        orderId,
        orderTotal,
        setSelectedAddressId,
        setNotes,
        goToAddress,
        goToSummary,
        goToPayment,
        handlePaymentSuccess,
    } = useCheckout({
        pricing,
        initialAddressId: "El bosque",
        onCreateOrder,
    });

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        await updateCartMutation.mutateAsync({
            id: productId,
            quantity: newQuantity,
        });
    };

    const selectedAddress = {
        id: "El bosque",
        name: "El bosque",
        address: "El bosque",
        city: "El bosque",
        state: "El bosque",
        zip: "El bosque",
        country: "El bosque",
        phone: "El bosque",
        alias: "El bosque",
        recipientName: "El bosque",
        street: "El bosque",
        zipCode: "El bosque"
    }

    return (
        <div className="min-h-screen bg-[#020202] text-zinc-300 py-10 px-4 relative overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {/* Fondo de cuadrícula técnico */}
            <div className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    backgroundPosition: '-1px -1px'
                }}
            />
            {/* Scanline overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Stepper (oculto en pantalla de éxito) */}
                {step !== "success" && <CheckoutStepper currentStep={step} />}

                {/* Tarjeta principal / Panel Técnico */}
                <div className="bg-[#050505] border border-zinc-800 p-6 relative">
                    {/* Detalles de esquinas (tech borders) */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-[3px] border-l-[3px] border-[#00f0ff]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-[3px] border-r-[3px] border-[#00f0ff]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[3px] border-l-[3px] border-[#00f0ff]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[3px] border-r-[3px] border-[#00f0ff]" />

                    {step === "resumen" && (
                        <SummaryStep
                            stock={stock}
                            items={cartItems}
                            pricing={pricing}
                            onNext={goToAddress}
                            onUpdateQuantity={handleUpdateQuantity}
                        />
                    )}

                    {step === "direccion" && (
                        <AddressStep
                            addresses={savedAddresses}
                            selectedAddressId={selectedAddressId}
                            notes={notes}
                            isLoading={isCreatingOrder}
                            onSelectAddress={setSelectedAddressId}
                            onNotesChange={setNotes}
                            onNext={goToPayment}
                            onBack={goToSummary}
                        />
                    )}

                    {step === "pago" && (
                        <Elements stripe={stripePromise} options={STRIPE_OPTIONS}>
                            <PaymentStep
                                orderId={orderId}
                                total={orderTotal}
                                customerEmail={customer.email}
                                customerName={customer.name}
                                selectedAddress={selectedAddress}
                                onSuccess={handlePaymentSuccess}
                                onBack={goToAddress}
                            />
                        </Elements>
                    )}

                    {step === "success" && (
                        <div className="flex flex-col items-center py-16 gap-6 text-center">
                            <div className="w-24 h-24 border border-[#00f0ff] flex items-center justify-center relative bg-[#00f0ff]/5">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f0ff]" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f0ff]" />
                                <svg className="w-12 h-12 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-white uppercase tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>PAGO_EXITOSO //</h2>
                                <p className="text-zinc-500 mt-2 text-sm tracking-widest uppercase">
                                    ORDEN REDIRIGIENDO...
                                </p>
                            </div>
                            <div className="w-full max-w-sm bg-black border border-zinc-800 p-4 text-left relative mt-4">
                                <span className="absolute -top-2.5 left-4 bg-[#050505] px-2 text-[10px] text-[#00f0ff] tracking-widest border border-zinc-800">ID_ORDEN</span>
                                <p className="text-zinc-300 font-mono text-sm tracking-wider mt-2">{orderId}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-zinc-600 text-[10px] tracking-[0.2em] uppercase mt-8 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 animate-pulse"></span>
                    PAGO_SEGURO_SSL // POWERED_BY_STRIPE
                </p>
            </div>
        </div>
    );
}

export default CheckoutPage;