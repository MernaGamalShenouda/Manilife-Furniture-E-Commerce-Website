const Order = require('../Models/OrderModel');
const OrderValid = require("../Utils/OrdersValidation");


exports.getAllOrders = async (req, res) => {
   return "getAllOrders"
};


exports.createOrder = async (req, res) => {
   try {
      let newOrder = new Order(req.body);
      
      if (!OrderValid(newOrder)) {
         return res.status(400).json({ message: "Invalid order data", errors: OrderValid.errors });
      }
      
      await newOrder.save();
      
      return res.status(201).json({ message: "Order created successfully", data: newOrder });
   } catch (error) {
      
      let errorMessage = "Internal Server Error";
      if (error.code === 11000) {
         errorMessage = "Duplicate key error";
      } else if (error.name === "ValidationError") {
         errorMessage = "Validation error";
      }
      return res.status(500).json({ message: errorMessage, error: error.message });
   }
};


exports.modifyOrderState = async (req, res) => {
   return "modifyOrderState"
};

exports.deleteOrder = async (req, res) => {
   // res.send("hello from deleteOrder !");
   try {
      const orderId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(orderId)) {
         return res.status(400).json({ message: "Invalid order ID" });
      }

      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
         return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({ message: "Deleted", data: deletedOrder });
   } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
   }
};

