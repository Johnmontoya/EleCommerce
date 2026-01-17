export interface TrackingEvent {
    id: string;
    status: string;
    description: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
    order: number;
    trackingId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class TrackingEventEntity implements TrackingEvent {
    constructor(
        public id: string,
        public status: string,
        public description: string,
        public location: string,
        public date: string,
        public time: string,
        public completed: boolean,
        public order: number,
        public trackingId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(trackingEvent: TrackingEventEntity): TrackingEventEntity {
        const id = crypto.randomUUID();
        return new TrackingEventEntity(
            id,
            trackingEvent.status,
            trackingEvent.description,
            trackingEvent.location,
            trackingEvent.date,
            trackingEvent.time,
            trackingEvent.completed,
            trackingEvent.order,
            trackingEvent.trackingId,
            trackingEvent.createdAt,
            trackingEvent.updatedAt,
        )
    }
}