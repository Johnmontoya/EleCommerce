import { connectPostgreSQL } from "./config/prisma.js";
import app from "./index.js";
import { connectDB } from "./infrastructure/database/connection.js";
import "dotenv/config";

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await connectPostgreSQL();
    app.listen(port, () => {
      console.log(`🚀 El servidor esta funcionando en el puerto: ${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor debido a un error de DB.");
  }
};

startServer();
