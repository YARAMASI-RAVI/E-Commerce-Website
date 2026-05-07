import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// Lazy init - only created when payment is actually used
const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay keys missing in .env file");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const razorpay = getRazorpay();

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ message: error.message || "Failed to create payment order" });
  }
};

// Verify Razorpay Payment & Save Order
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      total,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      total,
      isPaid: true,
      paidAt: new Date(),
      paymentResult: {
        id: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
      },
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = new Order({ user: req.user._id, items, total });
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};