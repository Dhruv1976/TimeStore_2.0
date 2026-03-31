import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT); // All routes require auth

router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:productId", removeFromCart);
router.put("/:productId", updateCartItem);
router.delete("/clear", clearCart);

export default router;

