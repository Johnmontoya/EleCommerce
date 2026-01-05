import type { Request, Response } from "express";
import type { CreatePaymentUseCase, DeletePaymentUseCase, GetPaymentByIdUseCase, UpdatePaymentUseCase } from "../../application/use-cases/payment/PaymentUseCase";
import { handleError } from "../../infrastructure/middlewares/errorHandler";
import { PaymentSchema } from "../../infrastructure/validation/Payment.schema";

export class PaymentController {
    constructor(private createPaymentUseCase: CreatePaymentUseCase,
        private getPaymentByIdUseCase: GetPaymentByIdUseCase,
        private updatePaymentUseCase: UpdatePaymentUseCase,
        private deletePaymentUseCase: DeletePaymentUseCase
    ) { }

    createPayment = async (req: Request, res: Response) => {
        try {
            const validateData = PaymentSchema.parse(req.body);
            const payment = await this.createPaymentUseCase.execute(validateData);
            res.status(201).json({
                success: true,
                message: 'Tarjeta guardada, opciones de eliminación y edición despues de reiniciar sesión',
                data: payment,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getPaymentById = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.userId;
            const data = await this.getPaymentByIdUseCase.execute(userId!);
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updatePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const data = req.body;
            await this.updatePaymentUseCase.execute(id!, data);
            res.status(200).json({
                success: true,
                message: 'Tarjeta actualizada correctamente',
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deletePayment = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.deletePaymentUseCase.execute(id!);
            res.status(200).json({
                success: true,
                message: 'Tarjeta eliminada correctamente',
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}