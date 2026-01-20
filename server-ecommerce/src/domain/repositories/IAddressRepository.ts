import type { UpdateAddressInput } from "../../application/Dto/address.dto.js";
import type { AddressUpdateInput } from "../../generated/prisma/models.js";
import type { AddressEntity } from "../entities/Address.js";

export interface IAddressRepository {
    create(address: AddressEntity): Promise<AddressEntity>;
    findById(id: string): Promise<AddressEntity | null>;
    findByUserId(userId: string): Promise<AddressEntity[] | null>;
    findDefaultByUserId(userId: string): Promise<AddressEntity | null>;
    update(id: string, address: AddressUpdateInput): Promise<AddressEntity | null>;
    delete(id: string): Promise<boolean>;
    setAsDefault(id: string, userId: string): Promise<AddressEntity | null>;
}