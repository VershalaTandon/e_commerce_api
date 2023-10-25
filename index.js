const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mangoDB = require("./db_mongo/db");
const mainRouter = require("./mainRouter");

const app = express();
require("dotenv").config();
mangoDB();

app.use(cors());

app.use(bodyParser.json());

app.use("/", mainRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
