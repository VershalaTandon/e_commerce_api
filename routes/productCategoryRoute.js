const express = require("express");
const ProductCategory = require("../db_mongo/schema/productCategory");
const apiResponse = require("../utils/apiResponse");

const router = express.Router();

// Create a new category
router.post("/category/", async (req, res) => {
  const { category, subCategory } = req.body;

  try {
    const categoryData = new ProductCategory({
      category,
      subCategory,
    });
    await categoryData.save();
    res.send(
      apiResponse(
        true,
        "SUCCESS",
        "Category inserted successfully.",
        categoryData
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get all category
router.get("/category", async (req, res) => {
  try {
    const categoryData = await ProductCategory.find({});
    res.send(apiResponse(true, "SUCCESS", "category data", categoryData));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Update a category
router.put("/category/:id", async (req, res) => {
  const { id } = req.params;
  const { category, subCategory } = req.body;

  try {
    const categoryData = await ProductCategory.findByIdAndUpdate(
      id,
      {
        category,
        subCategory,
      },
      { new: true }
    );
    res.send(
      apiResponse(
        true,
        "SUCCESS",
        "cCtegory updated successfully",
        categoryData
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Delete a category
router.delete("/category/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const categoryData = await Product.findByIdAndDelete(id);
    res.send(
      apiResponse(true, "SUCCESS", "Product deleted successfully", categoryData)
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

module.exports = router;
