const asyncHandler = require("express-async-handler");

const ShoppingCart = require("../modals/schema/shoppingCart");
const apiResponse = require("../utils/apiResponse");
const ShippingAddress = require("../modals/schema/shippingAddress");

// Create a new cart
exports.new_cart = asyncHandler(async (req, res, next) => {
  const { userId, productData } = req.body;

  try {
    // Get the address id
    let addressId = null;
    const addresses = await ShippingAddress.find({ userId: userId });
    if (addresses.length > 0) {
      // Get the default address
      const findDefaultAdd = addresses.find(function (item) {
        return item.defaultStatus === true;
      });
      if (findDefaultAdd) {
        addressId = findDefaultAdd._id;
      } else {
        addressId = addresses[0]._id;
      }
    }

    // Check if for this userId, cart data already existing or not
    const cart = await ShoppingCart.find({ userId: userId });
    const cartData = await cart.find((item) => item.cartStatus === "Pending");
    if (cartData !== undefined || cartData?.length > 0) {
      res.send(
        apiResponse(
          true,
          "SUCCESS",
          "Cart data already exists for this user. Please execute put api to update the cart data.",
          {}
        )
      );
    } else {
      const cart = new ShoppingCart({
        userId,
        productData,
        orderAmountSummary: {},
        addressId,
        cartStatus: "Pending",
      });
      await cart.save();
      res.send(
        apiResponse(
          true,
          "SUCCESS",
          "Product saved to cart successfully.",
          cart
        )
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get shopping cart product against user id
exports.get_cart_product = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const shoppingCart = await ShoppingCart.find({ userId: id });
    const cart = await shoppingCart.find(
      (item) => item.cartStatus === "Pending"
    );
    if (cart) {
      // Update order summary data
      let totalMRP = 0;
      let discountMRP = 0;
      let totalAmount = 0;

      cart.productData.map(async (item) => {
        totalMRP = item.mrpPrices;
        totalAmount = item.sellingPrice;
      });
      discountMRP = totalMRP - totalAmount;
      const orderAmountSummary = {
        totalMRP,
        discountMRP,
        totalAmount,
      };

      const cartData = await ShoppingCart.findByIdAndUpdate(
        cart._id,
        {
          orderAmountSummary,
        },
        { new: true }
      );

      res.send(apiResponse(true, "SUCCESS", "Cart data", cartData));
    } else {
      res.send(apiResponse(true, "SUCCESS", "Empty cart.", {}));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Update a cart product
exports.update_cart_product = asyncHandler(async (req, res, next) => {
  const { userId, productData, addressId } = req.body;

  try {
    // Check if for this userId, cart data already existing or not
    let cart = await ShoppingCart.find({ userId: userId });
    const cartData = cart.find((item) => item.cartStatus === "Pending");
    console.log(cartData);
    let message = "";
    // Check if save product id of same size added again in a cart then just update the count
    const findProduct = cartData.productData.find(function (item) {
      return (
        JSON.stringify(item.productId) ===
          JSON.stringify(productData[0].productId) &&
        item.sizeSelected.size === productData[0].sizeSelected.size
      );
    });
    if (findProduct) {
      const index = cartData.productData.findIndex(
        (x) => x.sizeSelected.size === findProduct.sizeSelected.size
      );

      cartData.productData[index].sizeSelected.count =
        productData[0].sizeSelected.count;
      cartData.productData[index].mrpPrices =
        cartData.productData[index].mrpPrices *
        cartData.productData[index].sizeSelected.count;
      cartData.productData[index].sellingPrice =
        cartData.productData[index].sellingPrice *
        cartData.productData[index].sizeSelected.count;
      cart = await ShoppingCart.findByIdAndUpdate(
        cartData._id,
        {
          productData: cartData.productData,
          addressId,
        },
        { new: true }
      );
      message = "Product updated to cart successfully.";
    } else {
      cartData.productData.push(productData[0]);
      cart = await ShoppingCart.findByIdAndUpdate(
        cartData._id,
        {
          productData: cartData.productData,
          addressId,
        },
        { new: true }
      );
      message = "Product added to cart successfully.";
    }

    res.send(apiResponse(true, "SUCCESS", message, cart));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Confirm checkout cart
exports.confirm_checkout = asyncHandler(async (req, res, next) => {
  const { userId, orderStatus } = req.body;

  try {
    const shoppingCart = await ShoppingCart.find({ userId: userId });
    const cartData = shoppingCart.find((item) => item.cartStatus === "Pending");
    const updatedData = cartData?.productData.map((item) => {
      if (item.orderStatus !== orderStatus) {
        item.orderStatus = orderStatus;
      }
      return item;
    });

    const cart = await ShoppingCart.findByIdAndUpdate(
      cartData._id,
      {
        productData: updatedData,
        cartStatus: orderStatus,
      },
      { new: true }
    );
    res.send(
      apiResponse(true, "SUCCESS", "Product ordered successfully.", cart)
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Delete a cart using cart id
exports.delete_cart = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const cart = await ShoppingCart.findByIdAndDelete(id);
    res.send(apiResponse(true, "SUCCESS", "Cart deleted successfully", cart));
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});
