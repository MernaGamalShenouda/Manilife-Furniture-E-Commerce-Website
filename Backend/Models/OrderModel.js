const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  totalPrice: Number,
  productTitles: [{ type: String }],
  state: { type: String, default: "Pending" },
  username:{type: String,ref: "users"},
  // username: { type: m, ref: "user" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("orders", orderSchema);
