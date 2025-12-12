import { Router } from "express";
import { ProductController } from "../presentation/controllers/ProductController";

const router = Router();

router.post("/add", ProductController.createProduct);
router.get("/all", ProductController.getAllProduct);
router.get("/:id", ProductController.getIdProduct);
router.put("/:id", ProductController.updateProduct)
router.delete("/:id", ProductController.deleteProduct);

export default router;
