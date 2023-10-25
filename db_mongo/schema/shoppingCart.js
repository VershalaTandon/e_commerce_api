const mongoose = require("mongoose");

const productSizeSchema = new mongoose.Schema({
  size: String,
  count: Number,
});

const orderSummerySchema = new mongoose.Schema({
  totalMRP: Number,
  discountMRP: Number,
  totalAmount: Number,
});

const selectedProducts = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product id is required"],
  },
  mrpPrices: Number,
  sellingPrice: Number,
  sizeSelected: {
    type: productSizeSchema,
    required: [true, "Size is required"],
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed"], // "Delivered"
    required: [true, "Order status is required"],
  },
});

const shoppingcartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  productData: [selectedProducts],
  orderAmountSummary: orderSummerySchema,
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress",
  },
  cartStatus: {
    type: String,
    enum: ["Pending", "Confirmed"],
    required: [true, "Cart status is required"],
  },
});

const ShoppingCart = mongoose.model("ShoppingCart", shoppingcartSchema);

module.exports = ShoppingCart;
