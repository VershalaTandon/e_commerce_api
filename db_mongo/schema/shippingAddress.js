const mongoose = require("mongoose");

const shippingAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  name: { type: String, required: [true, "Name is required"] },
  mobileNumber: { type: Number, required: [true, "Name is required"] },
  pincode: { type: Number, required: [true, "Pincode is required"] },
  state: { type: String, required: [true, "State is required"] },
  address: {
    type: String,
    required: [true, "Address (house no, Building, Area) is required"],
  },
  locality: { type: String, required: [true, "Locality is required"] },
  city: { type: String, required: [true, "City is required"] },
  typeOfAddress: {
    type: String,
    required: [true, "Type of address is required"],
  },
  defaultStatus: {
    type: Boolean,
    required: [true, "Default status is required"],
  },
});

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;
