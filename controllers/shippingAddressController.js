const asyncHandler = require("express-async-handler");

const ShippingAddress = require("../modals/schema/shippingAddress");
const apiResponse = require("../utils/apiResponse");

// Add a new address
exports.new_address = asyncHandler(async (req, res, next) => {
  const {
    userId,
    name,
    mobileNumber,
    pincode,
    state,
    address,
    locality,
    city,
    typeOfAddress,
  } = req.body;

  try {
    let defaultStatus = true;
    const addresses = await ShippingAddress.find({ userId: userId });
    if (addresses.length > 0) {
      const findDefaultAdd = addresses.find(function (item) {
        return item.defaultStatus === true;
      });
      if (findDefaultAdd) {
        // Check if default address already exists for this userId
        defaultStatus = false;
      }
    }

    const shipAddress = new ShippingAddress({
      userId,
      name,
      mobileNumber,
      pincode,
      state,
      address,
      locality,
      city,
      typeOfAddress,
      defaultStatus,
    });
    await shipAddress.save();
    res.send(
      apiResponse(
        true,
        "SUCCESS",
        "Shipping address saved successfully.",
        shipAddress
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Get all addresses of single user
exports.get_all_user_address = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const addresses = await ShippingAddress.find({ userId: id });

    if (addresses.length > 0) {
      res.send(
        apiResponse(true, "SUCCESS", "Shipping address data", addresses)
      );
    } else {
      res.send(apiResponse(true, "SUCCESS", "Shipping address not found.", {}));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Update a address
exports.update_address = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    userId,
    name,
    mobileNumber,
    pincode,
    state,
    address,
    locality,
    city,
    typeOfAddress,
    defaultStatus,
  } = req.body;

  try {
    const addresses = await ShippingAddress.findByIdAndUpdate(
      id,
      {
        userId,
        name,
        mobileNumber,
        pincode,
        state,
        address,
        locality,
        city,
        typeOfAddress,
        defaultStatus,
      },
      { new: true }
    );
    res.send(
      apiResponse(
        true,
        "SUCCESS",
        "Shipping address updated successfully",
        addresses
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});

// Delete a Shipping Address
exports.delete_address = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const addresses = await ShippingAddress.findByIdAndDelete(id);
    res.send(
      apiResponse(
        true,
        "SUCCESS",
        "Shipping address deleted successfully",
        addresses
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(apiResponse(false, "ERROR", error?.message, {}));
  }
});
