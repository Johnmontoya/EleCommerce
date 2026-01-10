import { Router } from "express";
import { PrismaWishListRepository } from "../infrastructure/repositories/PrismaWishListRepository";
import { WishlistController } from "../presentation/controllers/WishlistController";
import { CreateWishListUseCase, GetWishCountUseCase } from "../application/use-cases/wishlist/WishListUseCase";
import { DeleteWishListUseCase } from "../application/use-cases/wishlist/WishListUseCase";
import { GetWishListUseCase } from "../application/use-cases/wishlist/WishListUseCase";
import { authenticate } from "../infrastructure/middlewares/authMiddleware";

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