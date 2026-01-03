import type { Request, Response } from 'express';
import type { CreateAddressUseCase, DeleteAddressUseCase, GetAddressByIdUseCase, GetAddressByUserIdUseCase, SetDefaultAddressUseCase, UpdateAddressUseCase } from "../../application/use-cases/address/AddressUseCase";
import { CreateAddressSchema, UpdateAddressSchema } from "../../infrastructure/validation/Address.schema";
import { handleError } from '../../infrastructure/middlewares/errorHandler';

export class AddressController {
    constructor(
        private readonly createAddressUseCase: CreateAddressUseCase,
        private readonly getAddressByIdUseCase: GetAddressByIdUseCase,
        private readonly getAddressByUserIdUseCase: GetAddressByUserIdUseCase,
        private readonly updateAddressUseCase: UpdateAddressUseCase,
        private readonly deleteAddressUseCase: DeleteAddressUseCase,
        private readonly setDefaultAddressUseCase: SetDefaultAddressUseCase
    ) { }

    createAddress = async (req: Request, res: Response): Promise<void> => {
        try {
            const validateData = CreateAddressSchema.parse(req.body);

            const result = await this.createAddressUseCase.execute(validateData, req.user!.userId);

            res.status(201).json({
                success: true,
                message: 'Direccion creada exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAddressById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const result = await this.getAddressByIdUseCase.execute(id!, req.user!.userId);

            res.status(200).json({
                success: true,
                message: 'Direccion obtenida exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    getAddressByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'No autenticado'
                });
                return;
            }

            const result = await this.getAddressByUserIdUseCase.execute(userId);

            res.status(200).json({
                success: true,
                message: 'Direcciones obtenidas exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    updateAddress = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const { id } = req.params;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'No autenticado'
                });
                return;
            }

            const result = await this.updateAddressUseCase.execute(id!, req.body, userId);

            res.status(200).json({
                success: true,
                message: 'Direccion actualizada exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteAddress = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const { id } = req.params;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'No autenticado'
                });
                return;
            }

            const result = await this.deleteAddressUseCase.execute(id!, userId);

            res.status(200).json({
                success: true,
                message: 'Direccion eliminada exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }

    setDefaultAddress = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const { id } = req.params;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'No autenticado'
                });
                return;
            }

            const result = await this.setDefaultAddressUseCase.execute(id!, userId);

            res.status(200).json({
                success: true,
                message: 'Direccion predeterminada establecida exitosamente',
                data: result
            });
        } catch (error) {
            handleError(error, res);
        }
    }
}