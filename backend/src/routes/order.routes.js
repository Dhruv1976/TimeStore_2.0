import { Router } from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createOrder);
router.get("/", verifyJWT, getUserOrders);
router.get("/all", verifyJWT, verifyAdmin, getAllOrders);
router.get("/:id", verifyJWT, getOrderById);
router.patch("/:id/status", verifyJWT, verifyAdmin, updateOrderStatus);

export default router;
