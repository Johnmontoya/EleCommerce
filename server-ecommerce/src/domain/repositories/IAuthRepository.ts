import type { UserUpdateInput } from "../../generated/prisma/models";
import type { UserEntity } from "../entities/User";

export interface IAuthRepository {
    createUser(data: UserEntity): Promise<UserEntity>;
    findByUserByEmail: (email: string) => Promise<UserEntity | null>;
    findByUserById: (id: string) => Promise<UserEntity | null>;
    //updateUser: (id: string, data: UserUpdateInput) => Promise<UserEntity>;
    deleteUser: (id: string) => Promise<boolean>;

    //Refresh tokens
    createRefreshToken: (userId: string, token: string, expiresAt: Date) => Promise<void>;
    findRefreshToken: (token: string) => Promise<{ userId: string } | null>;
    deleteRefreshToken: (userId: string) => Promise<void>;
    deleteAllUserRefreshTokens: (userId: string) => Promise<void>;
    findAllUsers: (filters?: UsersFilters) => Promise<UserEntity[]>;
}

export interface UsersFilters {
    isActive?: boolean | undefined;
    role?: string | undefined;
    search?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
}