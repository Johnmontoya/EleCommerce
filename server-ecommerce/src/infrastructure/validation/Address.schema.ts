import z from "zod";

export const CreateAddressSchema = z.object({
    fullName: z.string().min(3, 'Nombre completo es requerido').nullable(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido').nullable(),
    street: z.string().min(5, 'Dirección es requerida').nullable(),
    city: z.string().min(2, 'Ciudad es requerida').nullable(),
    state: z.string().min(2, 'Estado/Provincia es requerido').nullable(),
    country: z.string().min(2, 'País es requerido').nullable(),
    zipCode: z.string().min(3, 'Código postal es requerido').nullable(),
    isDefault: z.boolean(),
});

export const UpdateAddressSchema = CreateAddressSchema.partial().strict();