export interface TrackingData {
    orderId: string;
    tracking: {
        trackingNumber: string;
        orderNumber: string;
        estimatedDelivery: string;
        origin: string;
        destination: string;
        weight: string;
        dimensions: string;
        carrier: string;
        priority: string;
    }
}

export interface TrackingEventData {
    id?: string;
    status: string | null;
    description: string | null;
    location: string | null;
    date: string | null;
    time: string | null;
    completed: boolean;
    order: number;
}

export interface TrackingDataResponse {
    id: string;
    trackingNumber: string;
    orderNumber: string;
    status: string;
    estimatedDelivery: string;
    origin: string;
    destination: string;
    weight: string;
    dimensions: string;
    carrier: string;
    currentLocation: string;
    orderId: string;
    createdAt: string;
    updatedAt: string;
    events: [
        {
            id: string;
            status: string;
            description: string;
            location: string;
            date: string;
            time: string;
            completed: boolean;
            order: number;
            trackingId: string;
            createdAt: string;
            updatedAt: string;
        }
    ]

}