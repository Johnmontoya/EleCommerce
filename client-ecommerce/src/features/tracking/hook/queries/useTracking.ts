import { trackingService } from "../../service/trackingService";
import { useQuery } from "@tanstack/react-query";

export const useTracking = (trackingId: string | null) => {
    return useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: () => trackingService.getTracking(trackingId!),
        enabled: !!trackingId, // Solo ejecuta la query si hay trackingId
        select: (response) => response,
        staleTime: 10 * 60 * 1000,
    });
};

export const useTrackingEvents = (trackingId: string | null) => {
    return useQuery({
        queryKey: ['tracking-events', trackingId],
        queryFn: () => trackingService.getTrackingEvents(trackingId!),
        enabled: !!trackingId, // Solo ejecuta la query si hay trackingId
        select: (response) => response,
        staleTime: 10 * 60 * 1000,
    });
};
