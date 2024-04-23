//#region Requires
const express = require("express");
const cors = require('cors');





const app = express();
const PORT = process.env.PORT || 7005;
const bodyParser = require("body-parser");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const OrdersRoutes = require("./Routes/OrdersRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");

app.use(cors());

const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/E-Commerce") //Orders Users Products
//#endregion

//#region Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/E-Commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});
//#endregion

//#region MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.set('view engine', 'view');
//#endregion

app.use("/api/products", ProductsRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/orders", OrdersRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
