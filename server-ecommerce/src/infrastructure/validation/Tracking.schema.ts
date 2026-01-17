import z from "zod";

export const trackingSchema = z.object({
    trackingNumber: z.string(),
    orderNumber: z.string(),
    estimatedDelivery: z.string("Ingresa la fecha de entrega estimada"),
    origin: z.string("Ingresa la ubicación de origen"),
    destination: z.string("Ingresa la ubicación de destino"),
    weight: z.string("Ingresa el peso del paquete"),
    dimensions: z.string("Ingresa las dimensiones del paquete"),
    carrier: z.string("Ingresa una empresa de logística"),
    priority: z.string("Ingresa la prioridad del paquete"),
})

export const trackingEventSchema = z.object({
    status: z.string().nullable(),
    description: z.string().nullable(),
    location: z.string().nullable(),
    date: z.string().nullable(),
    time: z.string().nullable(),
    completed: z.boolean(),
    order: z.number()
})

export const trackingEventSchemaPartial = trackingEventSchema.partial();