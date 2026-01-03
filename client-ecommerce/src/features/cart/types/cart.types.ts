export interface Order {
    id: string;
    userId: string;
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    addressId: string;
    trackingNumber: string;
    notes: string;
}

export interface CreateCartInput {
    productId: string;
    quantity: number;
    name: string;
    image: string;
    price: number;
    discount: number;
    stock: number;
}

export interface CartResponse {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    items: CartResponseItems[];
}

export interface CartResponseItems {
    id: string;
    cartId: string;
    name: string;
    image: string;
    productId: string;
    quantity: number;
    price: number;
    discount: number;
    stock: number;
}

export interface UpdateCartInput {
    id: string;
    quantity: number;
}