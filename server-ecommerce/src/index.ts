import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes"
import showcaseRoutes from "./routes/home.routes"

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas manejar cookies o cabeceras de autorización
  optionsSuccessStatus: 204 // Código de estado para respuestas OPTIONS exitosas
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/products', productRoutes)
app.use('/showcase', showcaseRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // No enviar respuesta si ya se envió
  if (res.headersSent) {
    return next(err);
  }

  console.error('Error middleware:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
});

export default app;
