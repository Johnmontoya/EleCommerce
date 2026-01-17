import { useMutation } from "@tanstack/react-query";
import type { TrackingData, TrackingEventData } from "../../types/tracking.types";
import { handleApiError } from "../../../../shared/lib/errorHandler";
import { toast } from "sonner";
import { trackingService } from "../../service/trackingService";
import { queryClient } from "../../../../shared/lib/queryClient";

// Hook para crear/actualizar tracking
export const useTrackingMutation = () => {
    const mutation = useMutation({
        mutationFn: (trackingData: TrackingData) => trackingService.createTracking(trackingData),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['tracking'] });
            toast.success(response.message || 'Seguimiento creado exitosamente');
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al crear el seguimiento');
        }
    });
    return mutation;
};

// Hook para crear eventos de tracking
export const useTrackingEventMutation = (trackingId: string) => {
    const mutation = useMutation({
        mutationFn: (eventData: TrackingEventData) =>
            trackingService.createTrackingEvent(trackingId, eventData),
        onSuccess: (response: any) => {
            // Invalida la query específica del tracking
            queryClient.invalidateQueries({ queryKey: ['tracking', trackingId] });
            queryClient.invalidateQueries({ queryKey: ['tracking-events', trackingId] });
            toast.success(response.message || 'Evento de seguimiento agregado exitosamente');
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al agregar el evento de seguimiento');
        }
    });
    return mutation;
};

// Hook para actualizar tracking
export const useUpdateTrackingMutation = (trackingId: string) => {
    const mutation = useMutation({
        mutationFn: (trackingData: Partial<TrackingData>) =>
            trackingService.updateTracking(trackingId, trackingData),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['tracking', trackingId] });
            queryClient.invalidateQueries({ queryKey: ['tracking-events', trackingId] });
            toast.success(response.message || 'Seguimiento actualizado exitosamente');
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al actualizar el seguimiento');
        }
    });
    return mutation;
};

// Hook para eliminar un evento
export const useDeleteTrackingEventMutation = (trackingId: string) => {
    const mutation = useMutation({
        mutationFn: (eventId: string) =>
            trackingService.deleteTrackingEvent(trackingId, eventId),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['tracking', trackingId] });
            queryClient.invalidateQueries({ queryKey: ['tracking-events', trackingId] });
            toast.success(response.message || 'Evento eliminado exitosamente');
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al eliminar el evento');
        }
    });
    return mutation;
};

export const useUpdateTrackingEventMutation = (trackingId: string) => {
    const mutation = useMutation({
        mutationFn: (eventData: Partial<TrackingEventData>) =>
            trackingService.updateTrackingEvent(trackingId, eventData.id!, eventData),
        onSuccess: (response: any) => {
            queryClient.invalidateQueries({ queryKey: ['tracking', trackingId] });
            queryClient.invalidateQueries({ queryKey: ['tracking-events', trackingId] });
            toast.success(response.message || 'Evento actualizado exitosamente');
        },
        onError: (error: any) => {
            handleApiError(error, 'Error al actualizar el evento');
        }
    });
    return mutation;
};