import type { UserEntity } from "../../domain/entities/User";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { prisma } from "../../config/prisma";
import type { CreateUserData } from "../../application/Dto/auth.dto";

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
                emailVerified: data.emailVerified || false
            }
        });
    }
    async findByUserByEmail(email: string): Promise<UserEntity | null> {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findByUserById(id: string): Promise<UserEntity | null> {
        return await prisma.user.findUnique({ where: { id } });
    }
    /*async updateUser(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        return await prisma.user.update({ where: { id }, data });
    }
    async deleteUser(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }*/
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
}