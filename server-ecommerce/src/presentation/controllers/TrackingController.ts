import type { Request, Response } from "express";
import type {
    CreateTrackingUseCase,
    DeleteTrackingUseCase,
    GetTrackingUseCase,
    UpdateTrackingUseCase
} from "../../application/use-cases/tracking/TrackingUseCase.js";
import { handleError } from "../../infrastructure/middlewares/errorHandler.js";
import { trackingEventSchema, trackingEventSchemaPartial, trackingSchema } from "../../infrastructure/validation/Tracking.schema.js";
import type { CreateTrackingEventUseCase, DeleteTrackingEventUseCase, GetTrackingEventsUseCase, UpdateTrackingEventUseCase } from "../../application/use-cases/tracking/TrackingEventUseCase.js";

export class TrackingController {
    constructor(
        // Use Cases de Tracking
        private getTrackingUseCase: GetTrackingUseCase,
        private createTrackingUseCase: CreateTrackingUseCase,
        private updateTrackingUseCase: UpdateTrackingUseCase,
        private deleteTrackingUseCase: DeleteTrackingUseCase,
        // Use Cases de Tracking Events
        private createTrackingEventUseCase: CreateTrackingEventUseCase,
        private updateTrackingEventUseCase: UpdateTrackingEventUseCase,
        private deleteTrackingEventUseCase: DeleteTrackingEventUseCase,
        private getTrackingEventsUseCase: GetTrackingEventsUseCase
    ) { }

    // ============================================
    // CONTROLADORES DE TRACKING
    // ============================================

    getOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId } = req.params;
            const tracking = await this.getTrackingUseCase.execute(trackingId!);

            res.status(200).json({
                success: true,
                message: 'Tracking obtenido exitosamente',
                data: tracking
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { orderId, tracking } = req.body;
            const trackingData = trackingSchema.parse(tracking);
            const track = await this.createTrackingUseCase.execute(orderId, trackingData);

            res.status(201).json({
                success: true,
                message: 'Tracking creado exitosamente',
                data: track
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId } = req.params;
            const { tracking } = req.body;
            const trackingData = trackingSchema.parse(tracking);

            console.log("trackingId", trackingId);
            console.log("trackingData", trackingData);

            const track = await this.updateTrackingUseCase.execute(trackingId!, trackingData);

            res.status(200).json({
                success: true,
                message: 'Tracking actualizado exitosamente',
                data: track
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId } = req.params;
            const track = await this.deleteTrackingUseCase.execute(trackingId!);

            res.status(200).json({
                success: true,
                message: 'Tracking eliminado exitosamente',
                data: track
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    // ============================================
    // CONTROLADORES DE TRACKING EVENTS
    // ============================================

    getEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId } = req.params;
            const events = await this.getTrackingEventsUseCase.execute(trackingId!);

            res.status(200).json({
                success: true,
                data: events
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId } = req.params;
            const eventData = trackingEventSchema.parse(req.body);

            const event = await this.createTrackingEventUseCase.execute(trackingId!, eventData);

            res.status(201).json({
                success: true,
                message: 'Evento de seguimiento agregado exitosamente',
                data: event
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updateEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { trackingId, eventId } = req.params;
            const eventData = req.body

            const event = await this.updateTrackingEventUseCase.execute(trackingId!, eventId!, eventData);

            res.status(200).json({
                success: true,
                message: 'Evento actualizado exitosamente',
                data: event
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { eventId } = req.params;
            const event = await this.deleteTrackingEventUseCase.execute(eventId!);

            res.status(200).json({
                success: true,
                message: 'Evento eliminado exitosamente',
                data: event
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}