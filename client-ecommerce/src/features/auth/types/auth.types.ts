export interface User {
    id?: string;
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
    createdAt: string | null | undefined;
    updatedAt: string | null | undefined;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    role: string;
}

export interface RefreshResponse {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface LogoutRequest {
    refreshToken: string;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface AuthResponse {
    data: {
        user: {
            id: string;
            email: string;
            password: string;
            username: string | null;
            role: string | null;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            avatar: string | null;
            isActive: boolean | null | undefined;
            emailVerified: boolean | null | undefined;
            createdAt: string | null | undefined;
            updatedAt: string | null | undefined;
        },
        tokens: {
            accessToken: string;
            refreshToken: string;
        },
    }
}

export interface UsersFilters {
    isActive?: boolean | undefined;
    role?: string | undefined;
    search?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}

export interface DeleteUserProps {
    id?: string;
    ids?: string[];
    adminToken: string;
}

export interface UpdateUserProps {
    id: string;
    userData: User
}