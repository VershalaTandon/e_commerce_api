const mongoose = require("mongoose");

const productSizeSchema = new mongoose.Schema({
  size: String,
  count: Number,
});

const productSchema = new mongoose.Schema({
  brand: { type: String, required: [true, "Brand is required"] },
  title: { type: String, required: [true, "Title is required"] },
  mrpPrice: { type: Number, required: [true, "MRP Price is required"] },
  discount: { type: Number, required: [true, "Discount is required"] },
  sellingPrice: { type: Number, required: [true, "Selling Price is required"] },
  category: { type: String, required: [true, "Category is required"] },
  subCategory: { type: String, required: [true, "Sub category is required"] },
  childCategory: {
    type: String,
    required: [true, "Child category is required"],
  },
  productDetails: String,
  images: { type: Array, required: [true, "Image is required"] },
  rating: Number,
  sizeAvailable: {
    type: [productSizeSchema],
    required: [true, "User ID is required"],
  },
  returnPolicy: String,
  sellerDetails: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
