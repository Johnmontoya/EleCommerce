export const endpoints = {
    tracking: {
        create: '/tracking',
        getOne: (trackingId: string) => `/tracking/${trackingId}`,
        update: (trackingId: string) => `/tracking/${trackingId}`,
        delete: (trackingId: string) => `/tracking/${trackingId}`,
        createEvent: (trackingId: string) => `/tracking/${trackingId}/events`,
        getEvents: (trackingId: string) => `/tracking/${trackingId}/events`,
        deleteEvent: (trackingId: string, event: string) => `/tracking/${trackingId}/events/${event}`,
        updateEvent: (trackingId: string, event: string) => `/tracking/${trackingId}/events/${event}`
    }
}