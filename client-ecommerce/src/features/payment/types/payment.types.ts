export interface PaymentInput {
    id?: string;
    userId: string;
    cardNumber: string;
    cardHolder: string;
    cardExpiration: string;
    cardCvv: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UpdatePaymentInput {
    id: string;
    payment: PaymentInput;
}
