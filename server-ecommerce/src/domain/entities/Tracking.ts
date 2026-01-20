import type { OrderStatus } from "../repositories/IOrderRepository.js";

export interface Tracking {
    id: string;
    trackingNumber: string;
    orderNumber: string;
    status: OrderStatus;
    estimatedDelivery: string;
    origin: string;
    destination: string;
    weight: string | null;
    dimensions: string | null;
    carrier: string;
    priority: string;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class TrackingEntity implements Tracking {
    constructor(
        public id: string,
        public trackingNumber: string,
        public orderNumber: string,
        public status: OrderStatus,
        public estimatedDelivery: string,
        public origin: string,
        public destination: string,
        public weight: string | null,
        public dimensions: string | null,
        public carrier: string,
        public priority: string,
        public orderId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(tracking: TrackingEntity): TrackingEntity {
        const id = crypto.randomUUID();
        return new TrackingEntity(
            id,
            tracking.trackingNumber,
            tracking.orderNumber,
            tracking.status,
            tracking.estimatedDelivery,
            tracking.origin,
            tracking.destination,
            tracking.weight,
            tracking.dimensions,
            tracking.carrier,
            tracking.priority,
            tracking.orderId,
            tracking.createdAt,
            tracking.updatedAt,
        )
    }
}