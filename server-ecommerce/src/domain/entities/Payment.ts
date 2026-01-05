export interface Payment {
    id: string;
    userId: string;
    cardNumber: string;
    cardHolder: string;
    cardExpiration: string;
    cardCvv: string;
    createdAt: Date;
    updatedAt: Date;
}

export class PaymentEntity implements Payment {
    constructor(
        public id: string,
        public userId: string,
        public cardNumber: string,
        public cardHolder: string,
        public cardExpiration: string,
        public cardCvv: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(cart: PaymentEntity): PaymentEntity {
        const id = crypto.randomUUID();
        return new PaymentEntity(
            id,
            cart.userId,
            cart.cardNumber,
            cart.cardHolder,
            cart.cardExpiration,
            cart.cardCvv,
            cart.createdAt,
            cart.updatedAt,
        )
    }
}