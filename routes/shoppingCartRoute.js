const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Require controller modules.
const shopping_controller = require("../controllers/shoppingContoller");

// Create a new cart
router.post("/shoppingCart", auth, shopping_controller.new_cart);

// Get shopping cart product against user id
router.get("/shoppingCart/:id", auth, shopping_controller.get_cart_product);

// Update a cart product
router.put(
  "/shoppingCart/updateCart/",
  auth,
  shopping_controller.update_cart_product
);

// Confirm checkout cart
router.put(
  "/shoppingCart/checkout",
  auth,
  shopping_controller.confirm_checkout
);

// Delete a cart using cart id
router.delete("/shoppingCart/:id", auth, shopping_controller.delete_cart);

module.exports = router;
