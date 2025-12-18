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

    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
    });
};