const Category = require("../db_mongo/schema/productCategory");

// Category check
const categoryCheck = async (category, subCategory, childCategory) => {
  const categoryList = await Category.find({}); // get the list of categories

  let cat = categoryList.find(function (item) {
    return (
      item.category.replaceAll(" ", "").toLowerCase() ===
      category.replaceAll(" ", "").toLowerCase()
    );
  });
  if (cat) {
    // check if the product category is in DB category list or not
    let subCat = cat.subCategory.find(function (item) {
      return (
        item.subCategory.replaceAll(" ", "").toLowerCase() ===
        subCategory.replaceAll(" ", "").toLowerCase()
      );
    });
    if (subCat) {
      // check if the product subCategory is in DB subCategory list or not
      let childCat = subCat.childCategory.find(function (item) {
        return (
          item.replaceAll(" ", "").toLowerCase() ===
          childCategory.replaceAll(" ", "").toLowerCase()
        );
      });
      if (childCat) {
        // check if the product childCategory is in DB childCategory list or not
        return true;
      } else {
        return "Child Category not found.";
      }
    } else {
      return "Sub Category not found.";
    }
  } else {
    return "Category not found.";
  }
};

module.exports = categoryCheck;
