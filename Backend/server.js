
//#region Requires
const express = require("express");
const app = express();
const PORT = process.env.PORT||7005;
const bodyParser = require("body-parser");
const OrdersRoutes = require("./Routes/OrdersRoutes");
// const ProductsRoutes = require("./Routes/ProductsRoutes");
// const UsersRoutes = require("./Routes/UsersRoutes");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/E-Commerce") //Orders Users Products
//#endregion

//#region MiddleWare
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'view');
//#endregion

app.use("/api/orders", OrdersRoutes);
// app.use("/api/products", ProductsRoutes);
// app.use("/api/users", UsersRoutes);

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

