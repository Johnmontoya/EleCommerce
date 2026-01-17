import type { TrackingData, TrackingEventData } from '../types/tracking.types';
import { apiClient } from '../../../shared/api/client';
import { endpoints } from '../api/endpoints';

export const trackingService = {
    // Obtener un tracking específico
    getTracking: async (trackingId: string) => {
        const { data } = await apiClient.get(endpoints.tracking.getOne(trackingId));
        return data;
    },

    // Crear un nuevo tracking
    createTracking: async (trackingData: TrackingData) => {
        const { data } = await apiClient.post(endpoints.tracking.create, trackingData);
        return data;
    },

    // Actualizar un tracking existente
    updateTracking: async (trackingId: string, trackingData: Partial<TrackingData>) => {
        const { data } = await apiClient.put(endpoints.tracking.update(trackingId), trackingData);
        return data;
    },

    // Eliminar un tracking
    deleteTracking: async (trackingId: string) => {
        const { data } = await apiClient.delete(endpoints.tracking.delete(trackingId));
        return data;
    },

    // Crear un evento de tracking
    createTrackingEvent: async (trackingId: string, eventData: TrackingEventData) => {
        const { data } = await apiClient.post(endpoints.tracking.createEvent(trackingId), eventData);
        return data;
    },

    // Actualizar un evento de tracking
    updateTrackingEvent: async (trackingId: string, eventId: string, eventData: Partial<TrackingEventData>) => {
        const { data } = await apiClient.put(endpoints.tracking.updateEvent(trackingId, eventId), eventData);
        return data;
    },

    // Eliminar un evento de tracking
    deleteTrackingEvent: async (trackingId: string, eventId: string) => {
        const { data } = await apiClient.delete(endpoints.tracking.deleteEvent(trackingId, eventId));
        return data;
    },

    // Obtener historial de eventos de un tracking
    getTrackingEvents: async (trackingId: string) => {
        const { data } = await apiClient.get(endpoints.tracking.getEvents(trackingId));
        console.log(data);
        return data;
    }
};