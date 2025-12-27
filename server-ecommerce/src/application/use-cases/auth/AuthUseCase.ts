import { UserEntity } from "../../../domain/entities/User";
import type { IAuthRepository, UsersFilters } from "../../../domain/repositories/IAuthRepository";
import type { UserUpdateInput } from "../../../generated/prisma/models";
import type { HashService } from "../../../infrastructure/services/HashService";
import type { JwtService } from "../../../infrastructure/services/JwtService";
import type { AuthResponse, LoginInput, RefreshTokenInput, RegisterInput, UserResponse } from "../../Dto/auth.dto";

export class RegisterUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService) { }

    async execute(input: RegisterInput): Promise<AuthResponse> {
        const existingUser = await this.authRepository.findByUserByEmail(input.email);
        if (existingUser) {
            throw new Error('El email ya esta registrado');
        }

        const hashedPassword = await this.hashService.hash(input.password);


        const user = await this.authRepository.createUser({
            id: crypto.randomUUID(),
            email: input.email,
            password: hashedPassword,
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            phone: input.phone,
            avatar: input.avatar,
            role: input.role,
            isActive: input.isActive,
            emailVerified: input.emailVerified,
        });

        const tokens = this.jwtService.generateTokenPair({ userId: user.id, email: user.email, role: user.role });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.authRepository.createRefreshToken(user.id, tokens.refreshToken, expiresAt);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            }, tokens
        };
    }
}

export class LoginUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService) { }

    async execute(input: LoginInput): Promise<AuthResponse> {
        const user = await this.authRepository.findByUserByEmail(input.email);

        if (!user) {
            throw new Error('Credenciales invalidas');
        }

        if (!user.isActive) {
            throw new Error('Usuario inactivo. Contacta a soporte');
        }

        const isPasswordValid = await this.hashService.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña invalida');
        }

        const tokens = this.jwtService.generateTokenPair({ userId: user.id, email: user.email, role: user.role });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.authRepository.createRefreshToken(user.id, tokens.refreshToken, expiresAt);

        return {
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            }, tokens
        };
    }
}

export class RefreshTokenUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly jwtService: JwtService
    ) { }

    async execute(input: RefreshTokenInput): Promise<{ accessToken: string, refreshToken: string }> {
        const payload = this.jwtService.verifyRefreshToken(input.refreshToken);

        const tokenData = await this.authRepository.findRefreshToken(input.refreshToken);
        if (!tokenData) {
            throw new Error('Refresh Token invalido o expirado');
        }

        const user = await this.authRepository.findByUserById(payload.userId);
        if (!user || !user.isActive) {
            throw new Error('Usuario no encontrado o inactivo');
        }

        const tokens = this.jwtService.generateTokenPair({ userId: user.id, email: user.email, role: user.role });

        await this.authRepository.deleteRefreshToken(input.refreshToken);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.authRepository.createRefreshToken(user.id, tokens.refreshToken, expiresAt);

        return tokens;
    }
}

export class LogoutUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(refreshToken: string): Promise<void> {
        await this.authRepository.deleteRefreshToken(refreshToken);
    }
}

export class LogoutAllDevicesUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(userId: string): Promise<void> {
        await this.authRepository.deleteAllUserRefreshTokens(userId);
    }
}

export class GetCurrentUserUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(userId: string): Promise<UserResponse> {
        const user = await this.authRepository.findByUserById(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return {
            id: user.id,
            email: user.email,
            username: user.username || null,
            role: user.role || null,
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            phone: user.phone || null,
            avatar: user.avatar || null,
            isActive: user.isActive || null,
            emailVerified: user.emailVerified || null,
        };
    }
}

export class GetAllUsersUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(filters?: UsersFilters): Promise<UserResponse[]> {
        const users = await this.authRepository.findAllUsers(filters);
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            username: user.username || null,
            role: user.role || null,
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            phone: user.phone || null,
            avatar: user.avatar || null,
            isActive: user.isActive || null,
            emailVerified: user.emailVerified || null,
        }));
    }
}

export class DeleteUserUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(id: string, adminId: string): Promise<void> {
        // Validar que se proporcione un ID
        if (!id) {
            throw new Error('ID de usuario requerido');
        }

        // No permitir que el admin se elimine a sí mismo
        if (id === adminId) {
            throw new Error('No puedes eliminar tu propia cuenta');
        }

        // Verificar que el usuario existe
        const user = await this.authRepository.findByUserById(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Intentar eliminar
        const deleted = await this.authRepository.deleteUser(id);

        if (!deleted) {
            throw new Error('Error al eliminar el usuario');
        }
    }
}

export class DeleteUsersUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(ids: string[], adminId: string): Promise<void> {
        if (!ids) {
            throw new Error('IDs de usuarios requeridos');
        }

        if (ids.includes(adminId)) {
            throw new Error('No puedes eliminar tu propia cuenta');
        }

        const user = await this.authRepository.findByUserById(ids[0]!);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const deleted = await this.authRepository.deleteUsers(ids);

        if (!deleted) {
            throw new Error('Error al eliminar el usuario');
        }
    }
}

export class ToggleActiveUserUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(id: string, adminId: string): Promise<void> {
        if (!id) {
            throw new Error('ID de usuario requerido');
        }

        if (id === adminId) {
            throw new Error('No puedes desactivar tu propia cuenta');
        }
        const user = await this.authRepository.findByUserById(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const deleted = await this.authRepository.toogleActiveUser(id);

        if (!deleted) {
            throw new Error('Error al eliminar el usuario');
        }
    }
}

export class GetUserByIdUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(id: string): Promise<UserEntity | null> {
        return await this.authRepository.findByUserById(id);
    }
}

export class UpdateUserUseCase {
    constructor(
        private readonly authRepository: IAuthRepository) { }

    async execute(id: string, data: UserUpdateInput): Promise<void> {
        if (!id) {
            throw new Error('ID de usuario requerido');
        }
        const user = await this.authRepository.findByUserById(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const updated = await this.authRepository.updateUser(id, data);

        if (!updated) {
            throw new Error('Error al actualizar el usuario');
        }
    }
}