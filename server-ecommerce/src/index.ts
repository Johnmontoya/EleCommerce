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

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const frontendUrl = process.env.FRONTEND_URL;
    // Si no hay origin (como en herramientas de test) o coincide (limpiando slashes finales)
    if (!origin || (frontendUrl && origin.replace(/\/$/, "") === frontendUrl.replace(/\/$/, ""))) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin, "Expected:", frontendUrl);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
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
