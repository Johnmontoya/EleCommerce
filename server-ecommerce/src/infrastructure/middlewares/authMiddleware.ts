import type { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/JwtService.js';

const jwtService = new JwtService();

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'No se proporciono un token'
            });
            return;
        }

        const token = authHeader.substring(7);

        const payload = jwtService.verifyAccessToken(token);

        req.user = {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        }

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token invalido o expirado'
        });
    }
}

export const authorize = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'No autorizado'
            });
            return;
        }

        if (!allowedRoles.includes(req.user?.role!)) {
            res.status(403).json({
                success: false,
                message: 'No tienes permisos para realizar esta accion'
            });
            return;
        }
        next();
    }
}

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const payload = jwtService.verifyAccessToken(token);

            req.user = {
                userId: payload.userId,
                email: payload.email,
                role: payload.role
            }
        }
    } catch (error) { }
    next();
}