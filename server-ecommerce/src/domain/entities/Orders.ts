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
    paymentMethod: string | null;
    addressId: string;
    trackingNumber: string | null;
    notes: string | null;
}

export class OrderEntity implements Order {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public subtotal: number,
        public tax: number,
        public shippingCost: number,
        public discount: number,
        public total: number,
        public status: string,
        public paymentStatus: string,
        public paymentMethod: string | null,
        public addressId: string,
        public trackingNumber: string | null,
        public notes: string | null,
    ) { }

    static create(props: Omit<Order, 'id'>): OrderEntity {
        const id = crypto.randomUUID();
        return new OrderEntity(
            id,
            props.userId,
            props.subtotal,
            props.tax,
            props.shippingCost,
            props.discount,
            props.total,
            props.status,
            props.paymentStatus,
            props.paymentMethod,
            props.addressId,
            props.trackingNumber,
            props.notes,
        );
    }
}