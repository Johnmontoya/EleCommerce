import jwt from "jsonwebtoken";
import "dotenv/config";

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export class JwtService {
    private readonly accessSecret: string;
    private readonly refreshSecret: string;

    constructor() {
        this.accessSecret = process.env.JWT_SECRET || 'default-secret';
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret';
    }

    generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.accessSecret, {
            expiresIn: '1h',
        });
    }

    generateRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.refreshSecret, {
            expiresIn: '7d',
        });
    }

    generateTokenPair(payload: JwtPayload): TokenPair {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    verifyAccessToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.accessSecret) as JwtPayload;
        } catch (error) {
            throw new Error('Invalid or expired access token');
        }
    }

    verifyRefreshToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.refreshSecret) as JwtPayload;
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    decodeToken(token: string): JwtPayload | null {
        try {
            return jwt.decode(token) as JwtPayload;
        } catch {
            return null;
        }
    }
}