import { z } from "zod";

export const PaymentSchema = z.object({
    userId: z.string(),
    cardNumber: z.string("Ingrese el número de la tarjeta").min(19, "El número de la tarjeta debe tener al menos 16 caracteres").max(19, "El número de la tarjeta debe tener al menos 16 caracteres"),
    cardHolder: z.string("Ingrese el nombre del titular").min(2, "El nombre del titular debe tener al menos 2 caracteres").max(100, "El nombre del titular debe tener al menos 100 caracteres"),
    cardExpiration: z.string("Ingrese la fecha de expiración").min(5, "La fecha de expiración debe tener al menos 5 caracteres").max(5, "La fecha de expiración debe tener al menos 5 caracteres"),
    cardCvv: z.string("Ingrese el CVV").min(3, "El CVV debe tener al menos 3 caracteres").max(3, "El CVV debe tener al menos 3 caracteres"),
});