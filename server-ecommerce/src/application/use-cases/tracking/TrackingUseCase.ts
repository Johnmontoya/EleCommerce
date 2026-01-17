import type { ITrackingRepository } from "../../../domain/repositories/ITrackingRepository";
import type { CreateTrackingEventInput, CreateTrackingInput } from "../../Dto/tracking.dto";

export class GetTrackingUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingNumber: string) {
        const data = await this.trackingRepository.getOne(trackingNumber);
        return data;
    }
}

export class CreateTrackingUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(orderId: string, tracking: CreateTrackingInput) {
        const data = await this.trackingRepository.create(orderId, tracking);
        return data;
    }
}

export class UpdateTrackingUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingId: string, tracking: Partial<CreateTrackingInput>) {
        console.log(trackingId)
        const data = await this.trackingRepository.update(trackingId, tracking);
        return data;
    }
}

export class DeleteTrackingUseCase {
    constructor(private trackingRepository: ITrackingRepository) { }

    async execute(trackingId: string) {
        const data = await this.trackingRepository.delete(trackingId);
        return data;
    }
}
