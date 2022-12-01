const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
     // {_id, name, price, ratings
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    rating: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
