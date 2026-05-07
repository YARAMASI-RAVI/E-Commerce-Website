import express from "express";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/orderController.js";

const router = express.Router();

// Razorpay payment routes
router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyPayment);

// Standard order routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Admin route
router.get("/", protect, admin, getAllOrders);

export default router;