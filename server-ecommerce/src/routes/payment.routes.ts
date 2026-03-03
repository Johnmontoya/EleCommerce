import { Router } from "express";
import express from "express";
import { PrismaPaymentRepository } from "../infrastructure/repositories/PrismaPaymentRepository.js";
import {
    CreatePaymentUseCase,
    DeletePaymentUseCase,
    GetPaymentByIdUseCase,
    UpdatePaymentUseCase,
    CreateStripePaymentIntentUseCase,
} from "../application/use-cases/payment/PaymentUseCase.js";
import { PaymentController } from "../presentation/controllers/PaymentController.js";
import { authenticate } from "../infrastructure/middlewares/authMiddleware.js";

const router = Router();
const paymentRepository = new PrismaPaymentRepository();

const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);
const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);
const createStripePaymentIntentUseCase = new CreateStripePaymentIntentUseCase();

const paymentController = new PaymentController(
    createPaymentUseCase,
    getPaymentByIdUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase,
    createStripePaymentIntentUseCase,
);

// ── Tarjetas guardadas en DB ─────────────────────────────────────────────────
router.post('/createCard', authenticate, paymentController.createPayment);
router.get('/getCard', authenticate, paymentController.getPaymentById);
router.put('/payments/:id', authenticate, paymentController.updatePayment);
router.delete('/payments/:id', authenticate, paymentController.deletePayment);

// ── Stripe ───────────────────────────────────────────────────────────────────
// Crear PaymentIntent (requiere autenticación)
router.post('/create-intent', authenticate, paymentController.createPaymentIntent);

// Webhook de Stripe (público — la verificación se hace con la firma)
// ⚠️ IMPORTANTE: Necesita express.raw() — se aplica antes de express.json() en index.ts
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

export default router;