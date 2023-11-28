const asyncHandler = require("express-async-handler");

const ProductCategory = require("../modals/schema/productCategory");
const apiResponse = require("../utils/apiResponse");

// Create a new category
exports.new_category = asyncHandler(async (req, res, next) => {
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
exports.all_category_list = asyncHandler(async (req, res, next) => {
  try {
    const categoryData = await ProductCategory.find({});
    res.send(apiResponse(true, "SUCCESS", "category data", categoryData));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Update a category
exports.update_cateory = asyncHandler(async (req, res, next) => {
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
exports.delete_category = asyncHandler(async (req, res, next) => {
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
