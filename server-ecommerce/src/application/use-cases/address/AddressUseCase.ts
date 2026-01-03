import { AddressEntity } from "../../../domain/entities/Address";
import type { IAddressRepository } from "../../../domain/repositories/IAddressRepository";
import type { AddressUpdateInput } from "../../../generated/prisma/models";
import type { CreateAddressInput, UpdateAddressInput } from "../../Dto/address.dto";

export class CreateAddressUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(input: CreateAddressInput, userId: string): Promise<AddressEntity> {
        if (input.isDefault) {
            const defaultAddress = await this.addressRepository.findDefaultByUserId(userId);
            if (defaultAddress) {
                console.log(defaultAddress);
                await this.addressRepository.update(defaultAddress.id, { isDefault: false });
            }
        }

        const address = AddressEntity.create({
            userId,
            fullName: input.fullName,
            phone: input.phone,
            street: input.street,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            country: input.country,
            isDefault: input.isDefault ?? false,
        });
        return await this.addressRepository.create(address);
    }
}

export class GetAddressByIdUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(id: string, userId: string): Promise<AddressEntity> {
        const address = await this.addressRepository.findById(id);
        if (!address) {
            throw new Error("Direccion no encontrada");
        }
        if (address.userId !== userId) {
            throw new Error("No tienes permiso para acceder a esta direccion");
        }
        return address;
    }
}

export class GetAddressByUserIdUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(userId: string): Promise<AddressEntity[]> {
        const addresses = await this.addressRepository.findByUserId(userId);
        if (!addresses) {
            throw new Error("Direccion no encontrada");
        }
        return addresses;
    }
}

export class UpdateAddressUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(id: string, input: UpdateAddressInput, userId: string): Promise<AddressEntity> {
        const existingAddress = await this.addressRepository.findById(id);
        if (!existingAddress) {
            throw new Error("Direccion no encontrada");
        }
        if (existingAddress.userId !== userId) {
            throw new Error("No tienes permiso para acceder a esta direccion");
        }

        /*if (input.isDefault === true) {
            const defaultAddress = await this.addressRepository.findDefaultByUserId(userId);
            if (defaultAddress && defaultAddress.id !== id) {
                await this.addressRepository.update(defaultAddress.id, { isDefault: false });
            }
        }*/
        const updatedAddress = await this.addressRepository.update(id, input);

        if (!updatedAddress) {
            throw new Error('Error al actualizar la direccion')
        }

        return updatedAddress;
    }
}

export class DeleteAddressUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(id: string, userId: string): Promise<void> {
        const address = await this.addressRepository.findById(id);
        if (!address) {
            throw new Error("Direccion no encontrada");
        }
        if (address.userId !== userId) {
            throw new Error("No tienes permiso para eliminar esta direccion");
        }

        const deleted = await this.addressRepository.delete(id);

        if (!deleted) {
            throw new Error("Error al eliminar la direccion");
        }
    }
}

export class SetDefaultAddressUseCase {
    constructor(
        private readonly addressRepository: IAddressRepository) { }

    async execute(id: string, userId: string): Promise<AddressEntity> {
        const address = await this.addressRepository.findById(id);
        if (!address) {
            throw new Error("Direccion no encontrada");
        }
        if (address.userId !== userId) {
            throw new Error("No tienes permiso para modificar esta direccion");
        }

        const updatedAddress = await this.addressRepository.setAsDefault(id, userId);

        if (!updatedAddress) {
            throw new Error('Error al establecer la direccion predeterminada')
        }

        return updatedAddress;
    }
}