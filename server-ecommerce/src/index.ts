import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js"
import showcaseRoutes from "./routes/home.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import authRoutes from "./routes/auth.routes.js"
import addressRoutes from "./routes/address.routes.js"
import orderRoutes from "./routes/order.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import wishlistRoutes from "./routes/wishlist.route.js"
import trackingRoutes from "./routes/tracking.routes.js"

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas manejar cookies o cabeceras de autorización
  optionsSuccessStatus: 204 // Código de estado para respuestas OPTIONS exitosas
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/products', productRoutes)
app.use('/showcase', showcaseRoutes)
app.use('/categories', categoryRoutes)
app.use('/auth', authRoutes)
app.use('/address', addressRoutes)
app.use('/orders', orderRoutes)
app.use('/cart', cartRoutes)
app.use('/payments', paymentRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/tracking', trackingRoutes)

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
