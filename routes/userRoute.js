const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

// Create/Register a new user
router.post("/users/register", user_controller.user_register);

// Login user
router.post("/users/login", user_controller.user_login);

// Get all users
router.get("/users", user_controller.user_list);

// Update a user
router.put("/users", user_controller.user_update_data);

// Logout
router.put("/users/logout", user_controller.user_logout);

// Delete a user
router.delete("/users/:id", user_controller.user_delete);

module.exports = router;
