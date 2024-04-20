const mongoose = require("mongoose");

// const cartItemSchema = new mongoose.Schema({
//     productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'products'
//     },
//     quantity: Number,
// });

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
});

const usersSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  image: String,
  gender: String,
  cart: [cartItemSchema],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("users", usersSchema);
