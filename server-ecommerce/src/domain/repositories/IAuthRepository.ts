import type { ChangePasswordInput, UserResponse } from "../../application/Dto/auth.dto";
import type { UserUpdateInput } from "../../generated/prisma/models";
import type { UserEntity } from "../entities/User";

export interface IAuthRepository {
    createUser(data: UserEntity): Promise<UserEntity>;
    findByUserByEmail: (email: string) => Promise<UserEntity | null>;
    findByUserById: (id: string) => Promise<UserResponse | null>;
    updateUser: (id: string, data: UserUpdateInput) => Promise<UserEntity>;
    toogleActiveUser: (id: string) => Promise<boolean>;
    deleteUser: (id: string) => Promise<boolean>;
    deleteUsers: (ids: string[]) => Promise<boolean>;

    //Refresh tokens
    createRefreshToken: (userId: string, token: string, expiresAt: Date) => Promise<void>;
    findRefreshToken: (token: string) => Promise<{ userId: string } | null>;
    deleteRefreshToken: (userId: string) => Promise<void>;
    deleteAllUserRefreshTokens: (userId: string) => Promise<void>;
    findAllUsers: (filters?: UsersFilters) => Promise<UserResponse[]>;
    changePassword: (email: string, data: ChangePasswordInput) => Promise<UserEntity>;
}

export interface UsersFilters {
    isActive?: boolean | undefined;
    role?: string | undefined;
    search?: string | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
}