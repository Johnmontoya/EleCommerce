import { Router } from "express";
import { PrismaPaymentRepository } from "../infrastructure/repositories/PrismaPaymentRepository.js";
import { CreatePaymentUseCase, DeletePaymentUseCase, GetPaymentByIdUseCase, UpdatePaymentUseCase } from "../application/use-cases/payment/PaymentUseCase.js";
import { PaymentController } from "../presentation/controllers/PaymentController.js";

const router = Router();
const paymentRepository = new PrismaPaymentRepository();

const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);
const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);

const paymentController = new PaymentController(
    createPaymentUseCase,
    getPaymentByIdUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase
);

router.post('/createCard', paymentController.createPayment);
router.get('/getCard', paymentController.getPaymentById);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);

export default router;