//#region Requires
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 7005;
const bodyParser = require("body-parser");
const ProductsRoutes = require("./Routes/ProductsRoutes");
const OrdersRoutes = require("./Routes/OrdersRoutes");
const UsersRoutes = require("./Routes/UsersRoutes");
let Products  = require("./Models/Products.Model");

const fs = require('fs');

app.use(cors());

const mongoose = require("mongoose");
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

   // Read data from JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const jsonDataSlice = jsonData.slice(0, 20); // Extract the first 20 items from the array


      jsonDataSlice.forEach(async (item) => {
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

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
