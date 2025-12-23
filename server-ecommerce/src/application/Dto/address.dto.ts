import type z from "zod";
import type { CreateAddressSchema, UpdateAddressSchema } from "../../infrastructure/validation/Address.schema";

export type CreateAddressInput = z.infer<typeof CreateAddressSchema>;
export type UpdateAddressInput = z.infer<typeof UpdateAddressSchema>;

export interface CreateAddressData {
    userId: string;
    fullName: string | null;
    phone: string | null;
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    isDefault: boolean | null | undefined;
}