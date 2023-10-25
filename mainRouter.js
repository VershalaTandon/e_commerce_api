const express = require("express");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/productCategoryRoute");
const shippingAddressRoute = require("./routes/shippingAddressRoute");
const shoppingCartRoute = require("./routes/shoppingCartRoute");

const router = express.Router();

router.use("/", userRoute);
router.use("/", productRoute);
router.use("/", categoryRoute);
router.use("/", shippingAddressRoute);
router.use("/", shoppingCartRoute);

module.exports = router;
