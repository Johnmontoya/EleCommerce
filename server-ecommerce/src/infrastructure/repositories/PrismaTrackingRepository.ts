import type { CreateTrackingEventInput, CreateTrackingInput, TrackingResponse } from "../../application/Dto/tracking.dto";
import { prisma } from "../../config/prisma";
import type { ITrackingRepository } from "../../domain/repositories/ITrackingRepository";

export class PrismaTrackingRepository implements ITrackingRepository {
    // ============================================
    // MÉTODOS DE TRACKING
    // ============================================

    async create(orderId: string, tracking: CreateTrackingInput): Promise<boolean> {
        try {
            await prisma.$transaction(async (tx) => {
                // Verificar si ya existe tracking para esta orden
                let track = await tx.tracking.findUnique({ where: { orderId } });

                if (!track) {
                    track = await tx.tracking.create({
                        data: {
                            orderId: orderId,
                            trackingNumber: tracking.trackingNumber,
                            orderNumber: tracking.orderNumber,
                            status: "CONFIRMED",
                            estimatedDelivery: tracking.estimatedDelivery,
                            origin: tracking.origin,
                            destination: tracking.destination,
                            weight: tracking.weight,
                            dimensions: tracking.dimensions,
                            carrier: tracking.carrier,
                            priority: tracking.priority,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        }
                    });
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async update(trackingId: string, tracking: Partial<CreateTrackingInput>): Promise<boolean> {
        try {
            await prisma.tracking.update({
                where: { trackingNumber: trackingId },
                data: {
                    ...tracking,
                    updatedAt: new Date()
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async delete(trackingId: string): Promise<boolean> {
        try {
            // Los eventos se eliminan automáticamente por onDelete: Cascade
            await prisma.tracking.delete({
                where: { trackingNumber: trackingId }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getOne(trackingId: string): Promise<TrackingResponse | null> {
        try {
            const data = await prisma.tracking.findFirst({
                where: {
                    trackingNumber: trackingId
                },
                include: {
                    events: {
                        orderBy: {
                            order: 'asc'
                        }
                    }
                }
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    // ============================================
    // MÉTODOS DE TRACKING EVENTS
    // ============================================

    async createEvent(trackingId: string, event: CreateTrackingEventInput): Promise<boolean> {
        try {
            // Verificar que el tracking existe
            const tracking = await prisma.tracking.findUnique({
                where: { id: trackingId }
            });

            if (!tracking) {
                throw new Error('Tracking no encontrado');
            }

            // Crear el evento
            await prisma.trackingEvent.create({
                data: {
                    trackingId: trackingId,
                    status: event.status || 'In Transit',
                    description: event.description || '',
                    location: event.location || '',
                    date: event.date || '',
                    time: event.time || '',
                    completed: event.completed || false,
                    order: event.order || 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });

            return true;
        } catch (error) {
            throw error;
        }
    }

    async updateEvent(trackingId: string, eventId: string, event: Partial<CreateTrackingEventInput>): Promise<boolean> {
        try {
            await prisma.trackingEvent.update({
                where: { id: eventId },
                data: {
                    ...event,
                    updatedAt: new Date()
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteEvent(eventId: string): Promise<boolean> {
        try {
            await prisma.trackingEvent.delete({
                where: { id: eventId }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getEvents(trackingId: string): Promise<any[]> {
        try {
            const events = await prisma.trackingEvent.findMany({
                where: {
                    trackingId: trackingId
                },
                orderBy: {
                    order: 'asc'
                }
            });
            return events;
        } catch (error) {
            throw error;
        }
    }
}