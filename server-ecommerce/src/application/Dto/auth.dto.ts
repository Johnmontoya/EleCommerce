import type z from "zod";
import type { ChangePasswordSchema, LoginSchema, RefreshTokenSchema, AuthRegisterSchema } from "../../infrastructure/validation/Auth.schema.js";

export type RegisterInput = z.infer<typeof AuthRegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export interface CreateUserData {
    email: string;
    password: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    avatar: string | null;
    role: string | null;
    isActive: boolean | null | undefined;
    emailVerified: boolean | null | undefined;
    otp: string | null;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        username: string | null;
        role: string | null;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface UserResponse {
    id: string;
    email: string;
    username: string | null;
    role: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    avatar: string | null;
    isActive: boolean | null | undefined;
    emailVerified: boolean | null | undefined;
    otp: string | null;
    createdAt: Date | null | undefined;
    addresses: {
        street: string | null;
        city: string | null;
        state: string | null;
        zipCode: string | null;
        country: string | null;
    }[] | null;
}

export interface UpdateUserData {
    id?: string;
    email?: string;
    password?: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    avatar?: string | null;
    role?: string | null;
    isActive?: boolean;
    emailVerified?: boolean;
    otp?: string | null;
}