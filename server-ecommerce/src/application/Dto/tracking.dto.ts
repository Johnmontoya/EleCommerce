import type z from "zod";
import type { trackingSchema } from "../../infrastructure/validation/Tracking.schema.js";
import type { trackingEventSchema } from "../../infrastructure/validation/Tracking.schema.js";

export type CreateTrackingInput = z.infer<typeof trackingSchema>;
export type CreateTrackingEventInput = z.infer<typeof trackingEventSchema>;

export interface TrackingResponse {
    id: string;
    trackingNumber: string;
    orderNumber: string;
    status: string;
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