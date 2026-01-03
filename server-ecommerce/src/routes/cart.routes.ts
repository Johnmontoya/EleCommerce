import { Router } from "express";
import { PrismaCartItemRepository } from "../infrastructure/repositories/PrismaCartItemRepository";
import { CartController } from "../presentation/controllers/CartController";
import {
    CreateCartUseCase,
    DeleteCartUseCase,
    GetCartUseCase,
    UpdateCartUseCase
} from "../application/use-cases/cart/CartUseCase";
import { authenticate } from "../infrastructure/middlewares/authMiddleware";

const router = Router();
const cartRepository = new PrismaCartItemRepository();

const createCartUseCase = new CreateCartUseCase(cartRepository);
const getCartUseCase = new GetCartUseCase(cartRepository);
const deleteCartUseCase = new DeleteCartUseCase(cartRepository);
const updateCartUseCase = new UpdateCartUseCase(cartRepository);

const cartController = new CartController(
    createCartUseCase,
    getCartUseCase,
    deleteCartUseCase,
    updateCartUseCase
);

router.post('/cart/add', authenticate, cartController.createCart);
router.get('/cart/me', authenticate, cartController.getCart);
router.delete('/cart/:id', authenticate, cartController.deleteCart);
router.put('/cart', authenticate, cartController.updateCart);

export default router;