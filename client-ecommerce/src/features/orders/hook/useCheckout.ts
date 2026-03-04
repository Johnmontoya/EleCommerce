// src/features/checkout/hooks/useCheckout.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
    CheckoutStep,
    CheckoutPricing,
    CreateOrderResult,
} from "../types/checkout.types";

interface UseCheckoutProps {
    pricing: CheckoutPricing;
    initialAddressId: string;
    onCreateOrder: (addressId: string, notes: string) => Promise<CreateOrderResult>;
}

export function useCheckout({
    pricing,
    initialAddressId,
    onCreateOrder,
}: UseCheckoutProps) {
    const navigate = useNavigate();

    // ── Flujo ────────────────────────────────────────────────────────────────
    const [step, setStep] = useState<CheckoutStep>("resumen");
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    // ── Selección de dirección y notas ────────────────────────────────────────
    const [selectedAddressId, setSelectedAddressId] = useState(initialAddressId);
    const [notes, setNotes] = useState("");

    // ── Orden creada ──────────────────────────────────────────────────────────
    const [orderId, setOrderId] = useState("");
    const [orderTotal, setOrderTotal] = useState(
        pricing.subtotal + pricing.tax + pricing.shippingCost - pricing.discount
    );

    // ── Navegación entre pasos ────────────────────────────────────────────────
    const goToAddress = () => setStep("direccion");
    const goToSummary = () => setStep("resumen");

    /**
     * Crea la orden en el backend y avanza al paso de pago.
     * Se llama justo antes de mostrar el formulario de tarjeta,
     * así el orderId ya existe cuando Stripe confirma el pago.
     */
    const goToPayment = async () => {
        if (!selectedAddressId) return;

        setIsCreatingOrder(true);
        try {
            const result = await onCreateOrder(selectedAddressId, notes);
            console.log("✅ Orden creada:", result);
            setOrderId(result.orderId);
            setOrderTotal(result.total);
            setStep("pago");
        } catch {
            toast.error("Error al preparar la orden. Intenta de nuevo.");
        } finally {
            setIsCreatingOrder(false);
        }
    };

    /**
     * Callback que recibe PaymentStep cuando el pago fue exitoso.
     */
    const handlePaymentSuccess = (paymentIntentId: string) => {
        console.log("✅ Pago exitoso:", paymentIntentId);
        setStep("success");
        toast.success("¡Pago realizado exitosamente!");
        setTimeout(() => navigate(`/dashboard/orders/confirmation?trackingNumber=${orderId}`), 2500);
    };

    return {
        // Estado
        step,
        isCreatingOrder,
        selectedAddressId,
        notes,
        orderId,
        orderTotal,
        // Acciones
        setSelectedAddressId,
        setNotes,
        goToSummary,
        goToAddress,
        goToPayment,
        handlePaymentSuccess,
    };
}