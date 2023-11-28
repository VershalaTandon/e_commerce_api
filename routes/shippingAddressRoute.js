const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

// Require controller modules.
const shipping_address_controller = require("../controllers/shippingAddressController");

// Add a new address
router.post("/shippingAddress", auth, shipping_address_controller.new_address);

// Get all addresses of single user
router.get(
  "/shippingAddress/:id",
  auth,
  shipping_address_controller.get_all_user_address
);

// Update a address
router.put(
  "/shippingAddress/:id",
  auth,
  shipping_address_controller.update_address
);

// Delete a Shipping Address
router.delete(
  "/shippingAddress/:id",
  auth,
  shipping_address_controller.delete_address
);

module.exports = router;
