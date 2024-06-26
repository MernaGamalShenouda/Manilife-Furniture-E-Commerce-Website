//#region Requires
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 7007;
const bodyParser = require("body-parser");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const OrdersRoutes = require("./Routes/OrdersRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");
const uploadRoute = require("./Routes/UploadRoutes");

let Products  = require("./Models/Products.Model");

const fs = require('fs');

app.use(cors());

const mongoose = require("mongoose");
//#endregion

//#region Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB");

  //  Read data from JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const jsonDataSlice = jsonData.slice(0, 20);

      jsonData.forEach(async (item) => {
        try {
          const { name, price, category, short_description, images } = item;

          // Create a new product instance
          const newProduct = new Products({
            title: name,
            price: price,
            category: category,
            quantity: 5, 
            images: images, 
            details: {
              description: short_description,
              reviews: [] 
            }
          });

          await newProduct.save();
          console.log('Product created:', newProduct);
        } catch (err) {
          console.error('Error creating product:', err);
        }
      });
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
    }
  });
  
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
app.use("/api/uploadPhoto" , uploadRoute);


app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});

module.exports = express;
