import type { CreateTrackingEventInput, CreateTrackingInput, TrackingResponse } from "../../application/Dto/tracking.dto.js";

export interface ITrackingRepository {
    // Métodos de Tracking
    create(orderId: string, tracking: CreateTrackingInput): Promise<boolean>;
    update(trackingId: string, tracking: Partial<CreateTrackingInput>): Promise<boolean>;
    delete(trackingId: string): Promise<boolean>;
    getOne(trackingId: string): Promise<TrackingResponse | null>;

    // Métodos de Tracking Events
    createEvent(trackingNumber: string, event: CreateTrackingEventInput): Promise<boolean>;
    updateEvent(trackingId: string, eventId: string, event: Partial<CreateTrackingEventInput>): Promise<boolean>;
    deleteEvent(eventId: string): Promise<boolean>;
    getEvents(trackingNumber: string): Promise<any[]>;
}