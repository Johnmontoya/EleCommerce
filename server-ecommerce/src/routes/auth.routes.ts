import { Router } from "express";
import { authenticate, authorize } from "../infrastructure/middlewares/authMiddleware";

// Services
import { HashService } from "../infrastructure/services/HashService";
import { JwtService } from "../infrastructure/services/JwtService";

// Repositories
import { PrismaAuthRepository } from "../infrastructure/repositories/PrismaAuthRepository";
import {
    ChangePasswordClientUseCase,
    ChangePasswordUseCase,
    DeleteUsersUseCase,
    DeleteUserUseCase,
    ForgotPasswordUseCase,
    GetAllUsersUseCase,
    GetCurrentUserUseCase,
    GetUserByIdUseCase,
    LoginUseCase,
    LogoutAllDevicesUseCase,
    LogoutUseCase,
    RefreshTokenUseCase,
    RegisterUseCase,
    ToggleActiveUserUseCase,
    UpdateUserUseCase
} from "../application/use-cases/auth/AuthUseCase";
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
const getAllUsersUseCase = new GetAllUsersUseCase(authRepository);
const deleteUserUseCase = new DeleteUserUseCase(authRepository);
const deleteUsersUseCase = new DeleteUsersUseCase(authRepository);
const toggleActiveUserUseCase = new ToggleActiveUserUseCase(authRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(authRepository);
const updateUserUseCase = new UpdateUserUseCase(authRepository);
const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository);
const changePasswordUseCase = new ChangePasswordUseCase(authRepository, hashService);
const changePasswordUseCaseClient = new ChangePasswordClientUseCase(authRepository, hashService);

const authController = new AuthController(
    registerUseCase,
    getCurrentUserUseCase,
    loginUseCase,
    refreshTokenUseCase,
    logoutUseCase,
    logoutAllDevicesUseCase,
    getAllUsersUseCase,
    deleteUserUseCase,
    deleteUsersUseCase,
    toggleActiveUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    forgotPasswordUseCase,
    changePasswordUseCase,
    changePasswordUseCaseClient
);

router.post('/register', authController.register);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authenticate, authController.logout);
router.post('/logout-all-devices', authenticate, authController.logoutAllDevices);
/** Users */
router.get('/all', authController.getAllUsers);
router.delete('/delete/:id', authenticate, authorize('ADMIN'), authController.deleteUser);
router.delete('/delete-users', authenticate, authorize('ADMIN'), authController.deleteUsers);
router.put('/toggle-active/:id', authenticate, authorize('ADMIN'), authController.toggleActiveUser);
router.get('/get-user/:id', authenticate, authorize('ADMIN'), authController.getUserById);
router.put('/update/:id', authenticate, authController.updateUser);
/** Password */
router.post('/forgot-password', authController.forgotPassword);
router.put('/change-password', authController.changePassword);
router.put('/change-password-client', authController.changePasswordClient);

export default router;
