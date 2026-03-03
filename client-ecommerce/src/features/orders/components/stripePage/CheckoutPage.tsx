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
            colorPrimary: "#38bdf8",
            colorBackground: "#0c1222",
            colorText: "#e2e8f0",
            colorDanger: "#fb7185",
            fontFamily: "system-ui, sans-serif",
            borderRadius: "10px",
        },
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

    // Función para actualizar cantidad - ¡YA LA TIENES!
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
        <div className="min-h-screen bg-[#080e1a] py-10 px-4">
            {/* Fondo decorativo */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-600/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-700/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Stepper (oculto en pantalla de éxito) */}
                {step !== "success" && <CheckoutStepper currentStep={step} />}

                {/* Tarjeta principal */}
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-black/40">
                    {step === "summary" && (
                        <SummaryStep
                            stock={stock}
                            items={cartItems}
                            pricing={pricing}
                            onNext={goToAddress}
                            onUpdateQuantity={handleUpdateQuantity} // 👈 ESTA ES LA LÍNEA QUE FALTABA
                        />
                    )}

                    {step === "address" && (
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

                    {step === "payment" && (
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
                        <div className="flex flex-col items-center py-10 gap-4 text-center">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">¡Pago exitoso!</h2>
                                <p className="text-slate-400 mt-1 text-sm">
                                    Tu pedido ha sido confirmado. Redirigiendo...
                                </p>
                            </div>
                            <div className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-left">
                                <p className="text-slate-500 text-xs mb-1">Número de orden</p>
                                <p className="text-slate-200 font-mono text-sm">{orderId}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-slate-700 text-xs mt-6 flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Pago seguro con cifrado SSL · Powered by Stripe
                </p>
            </div>
        </div>
    );
}

export default CheckoutPage;