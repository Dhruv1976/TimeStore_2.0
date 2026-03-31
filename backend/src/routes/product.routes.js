import { Router } from "express";
import {
    getAllProducts,
    getFeaturedProducts,
    getFilterOptions,
    getProductById,
    getProductSuggestions,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";
import { verifyJWT, verifyAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
import paginationMiddleware from "../middleware/pagination.middleware.js";

const router = Router();

router.get("/featured", getFeaturedProducts);
router.get("/filter-options", getFilterOptions);
router.get("/suggestions", getProductSuggestions);
router.get("/", paginationMiddleware(12), getAllProducts);
router.get("/:id", getProductById);

router.post("/", verifyJWT, verifyAdmin, upload.single("image"), createProduct); 
router.patch("/:id", verifyJWT, verifyAdmin, upload.single("image"), updateProduct); 
router.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);

export default router;
