// src/features/checkout/hooks/useStripePayment.ts
import { useState } from "react";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { paymentService } from "../services/stripeService";

interface UseStripePaymentProps {
    orderId: string;
    amount: number;
    customerEmail: string;
    customerName: string;
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    onSuccess: (paymentIntentId: string) => void;
    onError: (message: string) => void;
}

export function useStripePayment({
    orderId,
    amount,
    customerEmail,
    customerName,
    billingAddress,
    onSuccess,
    onError,
}: UseStripePaymentProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [cardComplete, setCardComplete] = useState({
        number: false,
        expiry: false,
        cvc: false,
    });

    const isFormComplete =
        cardComplete.number && cardComplete.expiry && cardComplete.cvc;

    const isReady = !!stripe && !!elements;

    const setFieldComplete = (
        field: keyof typeof cardComplete,
        complete: boolean
    ) => setCardComplete((prev) => ({ ...prev, [field]: complete }));

    const processPayment = async () => {
        if (!stripe || !elements || !isFormComplete) return;

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            // 1. Obtener clientSecret del backend
            const { clientSecret } = await paymentService.createPaymentIntent({
                orderId,
                amount,
                customerEmail,
                customerName,
            });

            // 2. Confirmar el pago con los datos de la tarjeta
            const cardElement = elements.getElement(CardNumberElement);
            if (!cardElement) throw new Error("Elemento de tarjeta no encontrado");

            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: customerName,
                            email: customerEmail,
                            ...(billingAddress && {
                                address: {
                                    line1: billingAddress.street,
                                    city: billingAddress.city,
                                    state: billingAddress.state,
                                    postal_code: billingAddress.zipCode,
                                    country: "MX",
                                },
                            }),
                        },
                    },
                }
            );

            // 3. Manejar resultado
            if (error) {
                const msg = error.message || "Error al procesar el pago";
                setErrorMessage(msg);
                onError(msg);
                return;
            }

            if (
                paymentIntent?.status === "succeeded" ||
                paymentIntent?.status === "processing"
            ) {
                onSuccess(paymentIntent.id);
            } else {
                const msg = `Estado inesperado: ${paymentIntent?.status ?? "desconocido"}`;
                setErrorMessage(msg);
                onError(msg);
            }
        } catch (err: any) {
            const msg =
                err.response?.data?.message || "Error al procesar el pago";
            setErrorMessage(msg);
            onError(msg);
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        isProcessing,
        isFormComplete,
        isReady,
        errorMessage,
        setFieldComplete,
        processPayment,
    };
}