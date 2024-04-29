const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalPrice: Number,
  productTitles: [{ type: String }],
  state: { type: String, default: "Pending" },
  username: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orders", orderSchema);