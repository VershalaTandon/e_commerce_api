const express = require("express");
const Product = require("../db_mongo/schema/product");
const apiResponse = require("../utils/apiResponse");
const categoryCheck = require("../utils/categoryCheck");

const router = express.Router();

// Create a new product
router.post("/product", (req, res) => {
  const {
    brand,
    title,
    mrpPrice,
    discount,
    sellingPrice,
    category,
    subCategory,
    childCategory,
    productDetails,
    images,
    rating,
    sizeAvailable,
    returnPolicy,
    sellerDetails,
  } = req.body;

  try {
    const product = new Product({
      brand,
      title,
      mrpPrice,
      discount,
      sellingPrice,
      category,
      subCategory,
      childCategory,
      productDetails,
      images,
      rating,
      sizeAvailable,
      returnPolicy,
      sellerDetails,
    });

    const categoryResult = categoryCheck(category, subCategory, childCategory);
    categoryResult
      .then(async (response) => {
        if (response === true) {
          await product.save();
          res.send(
            apiResponse(
              true,
              "SUCCESS",
              "Product inserted successfully.",
              product
            )
          );
        } else {
          res.status(404).send(apiResponse(false, "ERROR", response, {}));
        }
      })
      .catch((err) => {
        res.status(500).send(apiResponse(false, "ERROR", err?.message, {}));
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get all products
router.get("/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.send(apiResponse(true, "SUCCESS", "Product data", product));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get single product
router.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.find({ _id: id });
    if (product.length > 0) {
      res.send(apiResponse(true, "SUCCESS", "Product data", product[0]));
    } else {
      res.send(apiResponse(false, "ERROR", "Product not found.", {}));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Update a product
router.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const {
    brand,
    title,
    mrpPrics,
    sellingPrice,
    category,
    subCategory,
    childCategory,
    productDetails,
    images,
    rating,
    sizeAvailable,
  } = req.body;

  try {
    const categoryResult = categoryCheck(category, subCategory, childCategory);
    categoryResult
      .then(async (response) => {
        if (response === true) {
          const product = await Product.findByIdAndUpdate(
            id,
            {
              brand,
              title,
              mrpPrics,
              sellingPrice,
              category,
              subCategory,
              childCategory,
              productDetails,
              images,
              rating,
              sizeAvailable,
            },
            { new: true }
          );
          res.send(
            apiResponse(
              true,
              "SUCCESS",
              "Product updated successfully",
              product
            )
          );
        } else {
          res.status(404).send(apiResponse(false, "ERROR", response, {}));
        }
      })
      .catch((err) => {
        res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Delete a product
router.delete("/product/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    res.send(
      apiResponse(true, "SUCCESS", "Product deleted successfully", product)
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

module.exports = router;
