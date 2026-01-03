export interface Cart {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CartEntity implements Cart {
    constructor(
        public id: string,
        public userId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(cart: CartEntity): CartEntity {
        const id = crypto.randomUUID();
        return new CartEntity(
            id,
            cart.userId,
            cart.createdAt,
            cart.updatedAt,
        )
    }
}