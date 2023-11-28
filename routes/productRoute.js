const express = require("express");
const router = express.Router();

// Require controller modules.
const product_controller = require("../controllers/productController");

// Create a new product
router.post("/product", product_controller.new_product);

// Get all products
router.get("/product", product_controller.all_product_list);

// Get single product
router.get("/product/:id", product_controller.update_cart_product);

// Update a product
router.put("/product/:id", product_controller.update_product);

// Delete a product
router.delete("/product/:id", product_controller.delete_product);

module.exports = router;
