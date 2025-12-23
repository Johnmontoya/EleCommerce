import z from "zod";

export const AuthRegisterSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .toLowerCase()
        .trim(),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'Debe contener al menos una minúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    username: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido')
        .nullable(),
    role: z.string().nullable(),
    avatar: z.string().nullable(),
    emailVerified: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

export const registerSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .toLowerCase()
        .trim(),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'Debe contener al menos una minúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido')
        .optional(),
    role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN'], 'Role inválido'),
    avatar: z.string().optional(),
    emailVerified: z.boolean(),
    isActive: z.boolean()
});

export const LoginSchema = z.object({
    email: z.string()
        .email('Email inválido')
        .toLowerCase()
        .trim(),
    password: z.string()
        .min(1, 'La contraseña es requerida'),
});

export const RefreshTokenSchema = z.object({
    refreshToken: z.string()
        .min(1, 'Refresh token es requerido'),
});