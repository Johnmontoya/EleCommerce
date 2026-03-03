import type { Request, Response } from "express";
import type {
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentByIdUseCase,
    UpdatePaymentUseCase,
    CreateStripePaymentIntentUseCase,
} from "../../application/use-cases/payment/PaymentUseCase.js";
import { handleError } from "../../infrastructure/middlewares/errorHandler.js";
import { PaymentSchema } from "../../infrastructure/validation/Payment.schema.js";
import { StripeWebhookUseCase } from "../../application/use-cases/payment/StripeWebhookUseCase.js";
import { stripe } from "../../config/stripe.js";

export class PaymentController {
    private stripeWebhookUseCase = new StripeWebhookUseCase();

    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
        private getPaymentByIdUseCase: GetPaymentByIdUseCase,
        private updatePaymentUseCase: UpdatePaymentUseCase,
        private deletePaymentUseCase: DeletePaymentUseCase,
        private createStripePaymentIntentUseCase: CreateStripePaymentIntentUseCase,
    ) { }

    // ── Tarjetas guardadas en DB ───────────────────────────────────────────────

    createPayment = async (req: Request, res: Response) => {
        try {
            const validateData = PaymentSchema.parse(req.body);
            const payment = await this.createPaymentUseCase.execute(validateData);
            res.status(201).json({
                success: true,
                message: "Tarjeta guardada, opciones de eliminación y edición despues de reiniciar sesión",
                data: payment,
            });
        } catch (error) {
            handleError(error, res);
        }
    };

    getPaymentById = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;
            const data = await this.getPaymentByIdUseCase.execute(userId!);
            res.status(200).json({ success: true, data });
        } catch (error) {
            handleError(error, res);
        }
    };

    updatePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.updatePaymentUseCase.execute(id!, data);
            res.status(200).json({ success: true, message: "Tarjeta actualizada correctamente" });
        } catch (error) {
            handleError(error, res);
        }
    };

    deletePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.deletePaymentUseCase.execute(id!);
            res.status(200).json({ success: true, message: "Tarjeta eliminada correctamente" });
        } catch (error) {
            handleError(error, res);
        }
    };

    // ── Stripe PaymentIntent ───────────────────────────────────────────────────

    /**
     * POST /payments/create-intent
     * Crea un PaymentIntent en Stripe y devuelve el clientSecret al frontend.
     */
    createPaymentIntent = async (req: Request, res: Response) => {
        try {
            const { orderId, amount, customerEmail, customerName } = req.body;

            if (!orderId || amount == null || !customerEmail) {
                res.status(400).json({
                    success: false,
                    message: "Se requieren: orderId, amount, customerEmail y customerName",
                });
                return;
            }

            const data = await this.createStripePaymentIntentUseCase.execute({
                orderId,
                amount,
                customerEmail,
                customerName,
            });

            res.status(201).json({ success: true, data });
        } catch (error) {
            handleError(error, res);
        }
    };

    // ── Stripe Webhook ─────────────────────────────────────────────────────────

    /**
     * POST /payments/webhook
     * Recibe eventos de Stripe, verifica la firma y procesa el evento.
     * ⚠️ Este endpoint necesita el body RAW (antes de express.json()).
     */
    handleWebhook = async (req: Request, res: Response) => {
        const sig = req.headers["stripe-signature"];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("STRIPE_WEBHOOK_SECRET no definido");
            res.status(500).json({ success: false, message: "Webhook secret no configurado" });
            return;
        }

        if (!sig) {
            res.status(400).json({ success: false, message: "Falta la firma de Stripe" });
            return;
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
        } catch (err: any) {
            console.error(`❌ Error verificando firma webhook: ${err.message}`);
            res.status(400).json({ success: false, message: `Webhook error: ${err.message}` });
            return;
        }

        try {
            await this.stripeWebhookUseCase.execute(event);
            res.status(200).json({ received: true });
        } catch (error) {
            console.error("Error procesando webhook:", error);
            res.status(500).json({ success: false, message: "Error procesando el evento" });
        }
    };
}