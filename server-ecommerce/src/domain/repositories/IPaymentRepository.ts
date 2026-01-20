import type { CreatePaymentInput } from "../../application/Dto/payment.dto.js";
import type { PaymentEntity } from "../entities/Payment.js";

export interface IPaymentRepository {
    createPayment(payment: CreatePaymentInput): Promise<PaymentEntity>;
    getPaymentById(id: string): Promise<PaymentEntity | null>;
    updatePayment(id: string, payment: Partial<CreatePaymentInput>): Promise<PaymentEntity | null>;
    deletePayment(id: string): Promise<void>;
}