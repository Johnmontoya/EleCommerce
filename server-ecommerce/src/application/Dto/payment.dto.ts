import type z from "zod";
import type { PaymentSchema } from "../../infrastructure/validation/Payment.schema.js";

export type CreatePaymentInput = z.infer<typeof PaymentSchema>;