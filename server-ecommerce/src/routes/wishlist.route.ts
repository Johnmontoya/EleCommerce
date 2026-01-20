import { Router } from "express";
import { PrismaWishListRepository } from "../infrastructure/repositories/PrismaWishListRepository.js";
import { WishlistController } from "../presentation/controllers/WishlistController.js";
import { CreateWishListUseCase, GetWishCountUseCase } from "../application/use-cases/wishlist/WishListUseCase.js";
import { DeleteWishListUseCase } from "../application/use-cases/wishlist/WishListUseCase.js";
import { GetWishListUseCase } from "../application/use-cases/wishlist/WishListUseCase.js";
import { authenticate } from "../infrastructure/middlewares/authMiddleware.js";

const router = Router();
const wishRepository = new PrismaWishListRepository();
const wishlistController = new WishlistController(
    new CreateWishListUseCase(wishRepository),
    new DeleteWishListUseCase(wishRepository),
    new GetWishListUseCase(wishRepository),
    new GetWishCountUseCase(wishRepository)
);

router.post('/wish/add', authenticate, wishlistController.createWishList);
router.delete('/wish/delete/:id', authenticate, wishlistController.deleteWishList);
router.get('/wish/get', authenticate, wishlistController.getWishList);
router.get('/wish/count/:userId', wishlistController.getWishCount);

export default router;