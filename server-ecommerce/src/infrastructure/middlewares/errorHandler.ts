import { type Request, type Response } from "express";
import { flattenError, ZodError } from "zod";

export const handleError = (error: unknown, res: Response): void => {

    if (error instanceof ZodError) {

        const errorData = flattenError(error);

        res.status(400).json({
            success: false,
            message: 'Error de validación',
            errors: errorData.fieldErrors,
        });
        return;
    }

    if (error instanceof Error) {
        if (error.message.includes('El email ya esta registrado')) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
            return;
        }

        if (error.message.includes('Credenciales invalidas')) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
            return;
        }

        if (error.message.includes('token')) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
            return;
        }

        res.status(400).json({
            success: false,
            message: error.message,
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
    });
};