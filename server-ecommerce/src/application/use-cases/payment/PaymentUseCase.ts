import type { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository.js";
import type { CreatePaymentInput } from "../../Dto/payment.dto.js";
import { stripe } from "../../../config/stripe.js";
import { prisma } from "../../../config/prisma.js";

export class CreatePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(payment: CreatePaymentInput) {
        const data = await this.paymentRepository.createPayment(payment);
        return data;
    }
}

export class GetPaymentByIdUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(id: string) {
        const data = await this.paymentRepository.getPaymentById(id);
        return data;
    }
}

export class UpdatePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(id: string, payment: Partial<CreatePaymentInput>) {
        const data = await this.paymentRepository.updatePayment(id, payment);
        return data;
    }
}

export class DeletePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(id: string) {
        const data = await this.paymentRepository.deletePayment(id);
        return data;
    }
}

export class CreateStripePaymentIntentUseCase {
    async execute({
        orderId,
        amount,
        customerEmail,
        customerName,
    }: {
        orderId: string;
        amount: number;
        customerEmail: string;
        customerName: string;
    }) {
        // Verificar que la orden exista
        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) {
            throw new Error(`Orden no encontrada: ${orderId}`);
        }

        // Stripe trabaja en centavos (la menor unidad de la moneda)
        // Convertir el total a centavos
        const amountInCents = Math.round(amount * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "cop",
            automatic_payment_methods: { enabled: true },
            receipt_email: customerEmail,
            description: `EleCommerce - Pago orden #${orderId}`,
            metadata: {
                orderId,
                customerName,
                customerEmail,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        };
    }
}