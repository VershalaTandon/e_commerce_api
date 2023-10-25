const mongoose = require("mongoose");

const productSubCategorySchema = new mongoose.Schema({
  subCategory: String,
  childCategory: Array,
});

const productCategorySchema = new mongoose.Schema({
  category: String,
  subCategory: [productSubCategorySchema],
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);

module.exports = ProductCategory;
