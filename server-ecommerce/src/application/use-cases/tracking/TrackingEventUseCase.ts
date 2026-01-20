import type { CreateTrackingEventInput } from "../../Dto/tracking.dto.js";
import type { ITrackingRepository } from "../../../domain/repositories/ITrackingRepository.js";

// ============================================
// USE CASE: Crear Evento de Tracking
// ============================================
export class CreateTrackingEventUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingNumber: string, event: CreateTrackingEventInput): Promise<boolean> {
        return await this.trackingRepository.createEvent(trackingNumber, event);
    }
}

// ============================================
// USE CASE: Actualizar Evento de Tracking
// ============================================
export class UpdateTrackingEventUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingId: string, eventId: string, event: Partial<CreateTrackingEventInput>): Promise<boolean> {
        return await this.trackingRepository.updateEvent(trackingId, eventId, event);
    }
}

// ============================================
// USE CASE: Eliminar Evento de Tracking
// ============================================
export class DeleteTrackingEventUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(eventId: string): Promise<boolean> {
        return await this.trackingRepository.deleteEvent(eventId);
    }
}

// ============================================
// USE CASE: Obtener Eventos de Tracking
// ============================================
export class GetTrackingEventsUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingId: string): Promise<any[]> {
        return await this.trackingRepository.getEvents(trackingId);
    }
}