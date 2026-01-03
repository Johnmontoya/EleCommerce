export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CartItemEntity implements CartItem {
    constructor(
        public id: string,
        public cartId: string,
        public productId: string,
        public quantity: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(cartItem: Omit<CartItemEntity, 'id'>): CartItemEntity {
        const id = crypto.randomUUID();
        return new CartItemEntity(
            id,
            cartItem.cartId,
            cartItem.productId,
            cartItem.quantity,
            cartItem.createdAt,
            cartItem.updatedAt,
        )
    }
}