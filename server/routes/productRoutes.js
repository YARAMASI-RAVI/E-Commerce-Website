import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin only
router.post("/", protect, admin, addProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;