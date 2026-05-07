import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: Number,
  description: String
});

export default mongoose.model("Product", productSchema);