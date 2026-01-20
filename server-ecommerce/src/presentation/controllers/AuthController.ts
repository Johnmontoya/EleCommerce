import type { Request, Response } from 'express';
import type {
    RegisterUseCase,
    GetCurrentUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    LogoutAllDevicesUseCase,
    GetAllUsersUseCase,
    DeleteUserUseCase,
    DeleteUsersUseCase,
    ToggleActiveUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    ChangePasswordUseCase,
    ForgotPasswordUseCase,
    ChangePasswordClientUseCase
} from "../../application/use-cases/auth/AuthUseCase.js";
import { AuthRegisterSchema, LoginSchema, RefreshTokenSchema, UsersFiltersSchema } from "../../infrastructure/validation/Auth.schema.js";
import { handleError } from "../../infrastructure/middlewares/errorHandler.js";

export class AuthController {
    constructor(
        private registerUseCase: RegisterUseCase,
        private getCurrentUserUseCase: GetCurrentUserUseCase,
        private loginUseCase: LoginUseCase,
        private refreshTokenUseCase: RefreshTokenUseCase,
        private logoutUseCase: LogoutUseCase,
        private logoutAllDevicesUseCase: LogoutAllDevicesUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
        private deleteUsersUseCase: DeleteUsersUseCase,
        private toggleActiveUserUseCase: ToggleActiveUserUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private forgotPasswordUseCase: ForgotPasswordUseCase,
        private changePasswordUseCase: ChangePasswordUseCase,
        private changePasswordUseCaseClient: ChangePasswordClientUseCase) { }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            const validateData = AuthRegisterSchema.parse(req.body);

            const result = await this.registerUseCase.execute(validateData);

            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const validateData = LoginSchema.parse(req.body);

            const result = await this.loginUseCase.execute(validateData);

            res.status(200).json({
                success: true,
                message: 'Usuario logueado exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const validateData = RefreshTokenSchema.parse(req.body);

            const tokens = await this.refreshTokenUseCase.execute(validateData);

            res.status(200).json({
                success: true,
                message: 'Token renovado exitosamente',
                data: { tokens }
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                res.status(400).json({
                    success: false,
                    message: 'Token de refresco no proporcionado'
                });
                return;
            }

            await this.logoutUseCase.execute(refreshToken);

            res.status(200).json({
                success: true,
                message: 'Usuario deslogueado exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    logoutAllDevices = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(400).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            await this.logoutAllDevicesUseCase.execute(userId);

            res.status(200).json({
                success: true,
                message: 'Todos los dispositivos deslogueados exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getCurrentUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            const user = await this.getCurrentUserUseCase.execute(userId);
            res.status(200).json({
                success: true,
                message: 'Usuario obtenido exitosamente',
                data: user
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters = UsersFiltersSchema.parse(req.query)

            const users = await this.getAllUsersUseCase.execute(filters);
            res.status(200).json({
                success: true,
                message: 'Usuarios obtenidos exitosamente',
                data: users,
                count: users.length
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const adminId = req.user?.userId;

            if (!adminId) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            await this.deleteUserUseCase.execute(id!, adminId);

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const { ids } = req.body;
            const adminId = req.user?.userId;

            if (!adminId) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            if (!ids || ids.length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No se proporcionaron IDs'
                });
                return;
            }

            await this.deleteUsersUseCase.execute(ids, adminId);

            res.status(200).json({
                success: true,
                message: 'Usuarios eliminados exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    toggleActiveUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const adminId = req.user?.userId;

            if (!adminId) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            await this.toggleActiveUserUseCase.execute(id!, adminId);

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const adminId = req.user?.userId;

            if (!adminId) {
                res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
                return;
            }

            const user = await this.getUserByIdUseCase.execute(id!);

            res.status(200).json({
                success: true,
                message: 'Usuario obtenido exitosamente',
                data: user
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const data = req.body;

            await this.updateUserUseCase.execute(id!, data);

            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    forgotPassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;

            const user = await this.forgotPasswordUseCase.execute(email);

            res.status(200).json({
                success: true,
                message: 'Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña'
            });

        } catch (error) {
            handleError(error, res);
        }
    }

    changePassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const email = req.body.email;
            const otp = req.body.otp;
            const data = req.body;

            await this.changePasswordUseCase.execute(email!, otp, data);

            res.status(200).json({
                success: true,
                message: 'Contraseña actualizada exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    changePasswordClient = async (req: Request, res: Response): Promise<void> => {
        try {
            const email = req.body.email;
            const otp = req.body.otp;
            const data = req.body;

            await this.changePasswordUseCaseClient.execute(email!, otp, data);

            res.status(200).json({
                success: true,
                message: 'Contraseña actualizada exitosamente'
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}