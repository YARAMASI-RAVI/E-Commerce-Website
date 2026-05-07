import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: String,
        price: Number,
        image: String,
        category: String,
      },
    ],
    total: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    paymentResult: {
      id: String,
      orderId: String,
      signature: String,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);