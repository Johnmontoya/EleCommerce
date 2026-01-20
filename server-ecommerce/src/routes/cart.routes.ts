import { Router } from "express";
import { PrismaCartItemRepository } from "../infrastructure/repositories/PrismaCartItemRepository.js";
import { CartController } from "../presentation/controllers/CartController.js";
import {
    CreateCartUseCase,
    DeleteCartUseCase,
    GetCartCountUseCase,
    GetCartUseCase,
    UpdateCartUseCase
} from "../application/use-cases/cart/CartUseCase.js";
import { authenticate } from "../infrastructure/middlewares/authMiddleware.js";

const router = Router();
const cartRepository = new PrismaCartItemRepository();

const createCartUseCase = new CreateCartUseCase(cartRepository);
const getCartUseCase = new GetCartUseCase(cartRepository);
const deleteCartUseCase = new DeleteCartUseCase(cartRepository);
const updateCartUseCase = new UpdateCartUseCase(cartRepository);
const getCartCountUseCase = new GetCartCountUseCase(cartRepository);

const cartController = new CartController(
    createCartUseCase,
    getCartUseCase,
    deleteCartUseCase,
    updateCartUseCase,
    getCartCountUseCase
);

router.post('/cart/add', authenticate, cartController.createCart);
router.get('/cart/me', authenticate, cartController.getCart);
router.delete('/cart/:id', authenticate, cartController.deleteCart);
router.put('/cart', authenticate, cartController.updateCart);
router.get('/cart/count/:userId', cartController.getCartCount);

export default router;