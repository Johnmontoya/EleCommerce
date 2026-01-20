import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient;
};

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export const connectPostgreSQL = async () => {
    try {
        await prisma.$connect()
        console.log("🗄️ PostgreSQL Conectado");
    } catch (error) {
        console.error("Error connecting to PostgreSQL:", error);
        process.exit(1);
    }
}

export const disconnectPostgreSQL = async () => {
    await prisma.$disconnect()
}