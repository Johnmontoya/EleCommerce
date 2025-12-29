import type { UserEntity } from "../../domain/entities/User";
import type { IAuthRepository, UsersFilters } from "../../domain/repositories/IAuthRepository";
import { prisma } from "../../config/prisma";
import type { ChangePasswordInput, CreateUserData, UserResponse } from "../../application/Dto/auth.dto";
import type { Prisma } from "../../generated/prisma/client";
import type { UserUpdateInput } from "../../generated/prisma/models";
import { any } from "zod";

export class PrismaAuthRepository implements IAuthRepository {
    async createUser(data: CreateUserData): Promise<UserEntity> {
        return await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                avatar: data.avatar,
                role: data.role,
                isActive: data.isActive || true,
                emailVerified: data.emailVerified || false,
                otp: data.otp || null
            }
        });
    }
    async findByUserByEmail(email: string): Promise<UserEntity | null> {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findByUserById(id: string): Promise<UserResponse | null> {
        return await prisma.user.findUnique({ where: { id }, include: { addresses: true } });
    }
    async updateUser(id: string, data: UserUpdateInput): Promise<UserEntity> {
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

    async sendMail(mailOptions: any): Promise<void> {

    }
}