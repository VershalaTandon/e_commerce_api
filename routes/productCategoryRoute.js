const express = require("express");
const router = express.Router();

// Require controller modules.
const category_controller = require("../controllers/productCategoryController");

// Create a new category
router.post("/category/", category_controller.new_category);

// Get all category
router.get("/category", category_controller.all_category_list);

// Update a category
router.put("/category/:id", category_controller.update_cateory);

// Delete a category
router.delete("/category/:id", category_controller.delete_category);

module.exports = router;
