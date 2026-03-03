import type Stripe from "stripe";
import { prisma } from "../../../config/prisma.js";

/**
 * Handles Stripe webhook events and updates the order status accordingly.
 */
export class StripeWebhookUseCase {
    async execute(event: Stripe.Event): Promise<void> {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const orderId = paymentIntent.metadata?.orderId;

                if (orderId) {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: {
                            status: "CONFIRMED",
                            paymentMethod: "STRIPE",
                            paymentIntentId: paymentIntent.id,
                        },
                    });
                    console.log(`✅ Pago exitoso para la orden ${orderId} — PaymentIntent: ${paymentIntent.id}`);
                }
                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const orderId = paymentIntent.metadata?.orderId;

                if (orderId) {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: { status: "CANCELLED" },
                    });
                    console.log(`❌ Pago fallido para la orden ${orderId}`);
                }
                break;
            }

            default:
                // Eventos no manejados — no hacer nada
                break;
        }
    }
}
