import { Router } from "express";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware";

// Services
import { HashService } from "../infrastructure/services/HashService";
import { JwtService } from "../infrastructure/services/JwtService";

// Repositories
import { PrismaAuthRepository } from "../infrastructure/repositories/PrismaAuthRepository";
import { GetCurrentUserUseCase, LoginUseCase, LogoutAllDevicesUseCase, LogoutUseCase, RefreshTokenUseCase, RegisterUseCase } from "../application/use-cases/auth/AuthUseCase";
import { AuthController } from "../presentation/controllers/AuthController";

const router = Router();

const authRepository = new PrismaAuthRepository();
const hashService = new HashService();
const jwtService = new JwtService();

const registerUseCase = new RegisterUseCase(authRepository, hashService, jwtService);
const loginUseCase = new LoginUseCase(authRepository, hashService, jwtService);
const refreshTokenUseCase = new RefreshTokenUseCase(authRepository, jwtService);
const logoutUseCase = new LogoutUseCase(authRepository);
const logoutAllDevicesUseCase = new LogoutAllDevicesUseCase(authRepository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

const authController = new AuthController(
    registerUseCase,
    getCurrentUserUseCase,
    loginUseCase,
    refreshTokenUseCase,
    logoutUseCase,
    logoutAllDevicesUseCase,
);

router.post('/register', authController.register);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.post('/logout-all-devices', authenticate, authController.logoutAllDevices);

export default router;
