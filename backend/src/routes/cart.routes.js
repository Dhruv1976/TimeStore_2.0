import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", addToCart);
router.get("/", getCart);
router.put("/:productId", updateCartItem);
router.delete("/clear", clearCart);
router.delete("/:productId", removeFromCart);

export default router;

