import type { CreatePaymentInput } from "../../application/Dto/payment.dto.js";
import { prisma } from "../../config/prisma.js";
import type { PaymentEntity } from "../../domain/entities/Payment.js";
import type { IPaymentRepository } from "../../domain/repositories/IPaymentRepository.js";

export class PrismaPaymentRepository implements IPaymentRepository {
    async createPayment(payment: CreatePaymentInput): Promise<PaymentEntity> {
        const exists = await prisma.payment.findFirst({ where: { userId: payment.userId } });
        if (exists) {
            throw new Error("Ya existe una tarjeta para este usuario");
        }
        const data = await prisma.payment.create({ data: payment });
        return data;
    }

    async getPaymentById(id: string): Promise<PaymentEntity | null> {
        const data = await prisma.payment.findFirst({ where: { userId: id } });
        return data;
    }

    async updatePayment(id: string, payment: Partial<CreatePaymentInput>): Promise<PaymentEntity | null> {
        const exists = await prisma.payment.findFirst({ where: { id } });
        if (!exists) {
            throw new Error("Tarjeta no encontrada");
        }
        const data = await prisma.payment.update({ where: { id }, data: payment });
        return data;
    }

    async deletePayment(id: string): Promise<void> {
        const exists = await prisma.payment.findFirst({ where: { id } });
        if (!exists) {
            throw new Error("Tarjeta no encontrada");
        }
        await prisma.payment.delete({ where: { id: id } });
    }
}