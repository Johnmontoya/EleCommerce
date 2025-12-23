import mongoose from 'mongoose'
import "dotenv/config";

/* Conexión a MongoDB */
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_LOCAL as string)
        console.log("🗄️ MongoDB Conectado");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
