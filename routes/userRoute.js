const express = require("express");
const User = require("../db_mongo/schema/user");
const apiResponse = require("../utils/apiResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Create/Register a new user
router.post("/users/register", async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  //Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    let user = new User({
      name,
      email,
      mobileNumber,
      password: encryptedPassword,
    });
    await user.save();

    // Create token
    const token = jwt.sign({ _id: user._id, email }, process.env.TOKEN_KEY, {
      // expiresIn: "5h",
    });
    // save user token
    user = await User.findByIdAndUpdate(
      { _id: user._id },
      { token },
      { new: true }
    );

    res.send(
      apiResponse(true, "SUCCESS", "User registered successfully.", user)
    );
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res
        .status(500)
        .send(
          apiResponse(
            false,
            "ERROR",
            "Entered email is already registered.",
            {}
          )
        );
    } else {
      const errorMsg = error?.message ? error?.message : error;
      res.status(500).send(apiResponse(false, "ERROR", errorMsg, {}));
    }
  }
});

// Login user
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await User.find({ email: email });
    if (data.length > 0) {
      if (await bcrypt.compare(password, data[0].password)) {
        // Create token
        // Create token
        const token = jwt.sign(
          { _id: data[0]._id, email },
          process.env.TOKEN_KEY,
          {
            // expiresIn: "5h",
          }
        );
        // save user token
        const user = await User.findByIdAndUpdate(
          { _id: data[0]._id },
          { token },
          { new: true }
        );

        res.send(apiResponse(true, "SUCCESS", "Login successfully", user));
      } else {
        console.log("error");
        res
          .status(404)
          .send(apiResponse(false, "ERROR", "Invalid Password.", {}));
      }
    } else {
      res
        .status(404)
        .send(apiResponse(false, "ERROR", "Email not registered.", {}));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(apiResponse(true, "SUCCESS", "User data", users));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error, {}));
  }
});

// Update a user
router.put("/users", async (req, res) => {
  const { userId, name, email, mobileNumber } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { name, email, mobileNumber },
      { new: true }
    );
    res.send(apiResponse(true, "SUCCESS", "User updated successfully", user));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Logout
router.put("/users/logout", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { token: "" },
      { new: true }
    );
    res.send(apiResponse(true, "SUCCESS", "User logout successfully", user));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(apiResponse(true, "SUCCESS", "User deleted successfully", user));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

module.exports = router;
