import type { IAddressRepository } from "../../domain/repositories/IAddressRepository";
import { AddressEntity } from "../../domain/entities/Address";
import { prisma } from "../../config/prisma";
import type { CreateAddressData, UpdateAddressInput } from "../../application/Dto/address.dto";
import type { AddressUpdateInput } from "../../generated/prisma/models";

export class PrismaAddressRepository implements IAddressRepository {
    constructor() { }

    async create(address: CreateAddressData): Promise<AddressEntity> {
        return await prisma.address.create({
            data: {
                id: crypto.randomUUID(),
                userId: address.userId,
                fullName: address.fullName,
                phone: address.phone,
                street: address.street,
                city: address.city,
                state: address.state,
                country: address.country,
                zipCode: address.zipCode,
                isDefault: address.isDefault ?? false,
            }
        });
    }
    async findById(id: string): Promise<AddressEntity | null> {
        const address = await prisma.address.findUnique({ where: { id: id } });
        if (!address) {
            throw new Error("Direccion no encontrada");
        }
        return new AddressEntity(
            address.id,
            address.userId,
            address.fullName,
            address.phone,
            address.street,
            address.city,
            address.state,
            address.country,
            address.zipCode,
            address.isDefault
        );
    }
    async findByUserId(userId: string): Promise<AddressEntity[] | null> {
        const addresses = await prisma.address.findMany({
            where: { userId }, orderBy: [
                { isDefault: 'desc' },
                { createdAt: 'desc' }
            ]
        });

        return addresses.map(address => new AddressEntity(
            address.id,
            address.userId,
            address.fullName,
            address.phone,
            address.street,
            address.city,
            address.state,
            address.country,
            address.zipCode,
            address.isDefault
        ));
    }
    async findDefaultByUserId(userId: string): Promise<AddressEntity | null> {
        const address = await prisma.address.findFirst({ where: { userId, isDefault: true } });
        if (!address) {
            throw new Error("Direccion no encontrada");
        }
        return new AddressEntity(
            address.id,
            address.userId,
            address.fullName,
            address.phone,
            address.street,
            address.city,
            address.state,
            address.country,
            address.zipCode,
            address.isDefault
        );
    }
    async update(id: string, data: UpdateAddressInput): Promise<AddressEntity | null> {
        try {
            const updated = await prisma.address.update({
                where: { id },
                data: data
            })

            if (!updated) {
                throw new Error("Direccion no encontrada");
            }
            return new AddressEntity(
                updated.id,
                updated.userId,
                updated.fullName,
                updated.phone,
                updated.street,
                updated.city,
                updated.state,
                updated.country,
                updated.zipCode,
                updated.isDefault
            );
        } catch (error) {
            throw error;
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            await prisma.address.delete({
                where: { id }
            })
            return true
        } catch (error) {
            throw error;
        }
    }
    async setAsDefault(id: string, userId: string): Promise<AddressEntity | null> {
        try {
            const updated = await prisma.$transaction(async (tx) => {
                await tx.address.updateMany({
                    where: { userId, isDefault: true },
                    data: { isDefault: false }
                })
                return await tx.address.update({
                    where: { id },
                    data: { isDefault: true }
                })
            })
            if (!updated) {
                throw new Error("Direccion no encontrada");
            }
            return new AddressEntity(
                updated.id,
                updated.userId,
                updated.fullName,
                updated.phone,
                updated.street,
                updated.city,
                updated.state,
                updated.country,
                updated.zipCode,
                updated.isDefault
            );
        } catch (error) {
            throw error;
        }
    }
}