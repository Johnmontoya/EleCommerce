import type { UserEntity } from "../../domain/entities/User.js";
import type { IAuthRepository, UsersFilters } from "../../domain/repositories/IAuthRepository.js";
import { prisma } from "../../config/prisma.js";
import type { ChangePasswordInput, CreateUserData, UpdateUserData, UserResponse } from "../../application/Dto/auth.dto.js";
import type { Prisma } from "@prisma/client";

export class PrismaAuthRepository implements IAuthRepository {
    async createUser(data: CreateUserData): Promise<UserEntity> {
        try {
            const createdUser = await prisma.$transaction(async (tx) => {
                // 1. Crear el usuario
                const user = await tx.user.create({
                    data: {
                        email: data.email,
                        password: data.password,
                        username: data.username,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phone: data.phone,
                        avatar: data.avatar,
                        role: data.role || "USER", // valor por defecto recomendado
                        isActive: data.isActive ?? true,
                        emailVerified: data.emailVerified ?? false,
                        otp: data.otp ?? null,
                    },
                });

                // 2. Crear una dirección vacía (opcional, pero útil para usuarios)
                await tx.address.create({
                    data: {
                        userId: user.id,
                        fullName: null,
                        phone: null,
                        street: null,
                        city: null,
                        state: null,
                        country: null,
                        zipCode: null,
                        isDefault: false, // o true si quieres que sea predeterminada por defecto
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });

                // 3. Devolver el usuario creado (¡importante!)
                return user;
            });

            // Aquí sí puedes usar el usuario porque la transacción lo devuelve
            return createdUser;

        } catch (error) {
            throw error;
        }
    }
    async findByUserByEmail(email: string): Promise<UserEntity | null> {
        return await prisma.user.findUnique({ where: { email }, include: { addresses: true, cart: true } });
    }
    async findByUserById(id: string): Promise<UserResponse | null> {
        return await prisma.user.findUnique({ where: { id }, include: { addresses: true, cart: true } });
    }
    async updateUser(id: string, data: UpdateUserData): Promise<UserEntity> {
        return await prisma.user.update({ where: { id }, data });
    }
    async toogleActiveUser(id: string): Promise<boolean> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                return false;
            }
            await prisma.user.update({ where: { id }, data: { isActive: !user.isActive } });
            return true;
        } catch (error) {
            return false;
        }
    }
    async createRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void> {
        await prisma.refreshToken.create({
            data: {
                userId,
                token,
                expiresAt,
            }
        });
    }
    async findRefreshToken(token: string): Promise<{ userId: string } | null> {
        const refreshToken = await prisma.refreshToken.findUnique({ where: { token }, select: { userId: true, expiresAt: true } });
        if (!refreshToken || refreshToken.expiresAt < new Date()) {
            return null;
        }
        return { userId: refreshToken.userId };
    }
    async deleteRefreshToken(token: string): Promise<void> {
        await prisma.refreshToken.delete({ where: { token } }).catch(() => { });
    }
    async deleteAllUserRefreshTokens(userId: string): Promise<void> {
        await prisma.refreshToken.deleteMany({ where: { userId } });
    }
    async findAllUsers(filters?: UsersFilters): Promise<UserResponse[]> {
        const where: Prisma.UserWhereInput = {};

        let take: number = 10;
        let skip: number = 0;

        if (filters) {
            if (filters?.isActive !== undefined) {
                where.isActive = filters.isActive;
            }

            if (filters?.role !== undefined) {
                where.role = filters.role;
            }

            if (filters?.search) {
                where.OR = [
                    { username: { contains: filters.search } },
                    { email: { contains: filters.search } },
                ];
            }

            if (filters?.limit !== undefined) {
                take = parseInt(filters.limit);
            }

            if (filters?.offset !== undefined) {
                skip = parseInt(filters.offset);
            }
        }

        const queryBuilder = prisma.user.findMany({ where: where, take: take, skip: skip, include: { addresses: true } });

        return queryBuilder;
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            await prisma.user.delete({ where: { id } });
            return true;
        } catch (error) {
            // Si el usuario no existe o hay otro error
            return false;
        }
    }

    async deleteUsers(ids: string[]): Promise<boolean> {
        try {
            await prisma.user.deleteMany({ where: { id: { in: ids } } });
            return true;
        } catch (error) {
            // Si el usuario no existe o hay otro error
            return false;
        }
    }

    async changePassword(userId: string, data: ChangePasswordInput): Promise<UserEntity> {
        let update: any;
        update = {
            password: data.password,
            otp: null
        }

        return await prisma.user.update({ where: { email: userId }, data: update });
    }
}