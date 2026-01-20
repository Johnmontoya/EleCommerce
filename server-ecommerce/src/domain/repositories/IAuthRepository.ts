import type { ChangePasswordInput, UpdateUserData, UserResponse } from "../../application/Dto/auth.dto.js";
import type { UserEntity } from "../entities/User.js";

export interface IAuthRepository {
    createUser(data: UserEntity): Promise<UserEntity>;
    findByUserByEmail: (email: string) => Promise<UserEntity | null>;
    findByUserById: (id: string) => Promise<UserResponse | null>;
    updateUser: (id: string, data: UpdateUserData) => Promise<UserEntity>;
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