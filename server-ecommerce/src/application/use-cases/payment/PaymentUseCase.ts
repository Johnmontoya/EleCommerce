import type { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
import type { CreatePaymentInput } from "../../Dto/payment.dto";

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