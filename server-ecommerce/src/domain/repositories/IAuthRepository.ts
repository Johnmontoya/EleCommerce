import type { UserEntity } from "../entities/User";

export interface IAuthRepository {
    createUser(data: UserEntity): Promise<UserEntity>;
    findByUserByEmail: (email: string) => Promise<UserEntity | null>;
    findByUserById: (id: string) => Promise<UserEntity | null>;
    /*updateUser: (id: string, data: Partial<UserEntity>) => Promise<UserEntity>;
    deleteUser: (id: string) => Promise<void>;*/

    //Refresh tokens
    createRefreshToken: (userId: string, token: string, expiresAt: Date) => Promise<void>;
    findRefreshToken: (token: string) => Promise<{ userId: string } | null>;
    deleteRefreshToken: (userId: string) => Promise<void>;
    deleteAllUserRefreshTokens: (userId: string) => Promise<void>;
}