const express = require("express");
const router = express.Router();
const ordersController = require("../Controllers/OrdersController");

router.get('/', ordersController.getAllOrders);
router.get('/:username', ordersController.getOrdersByName);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.modifyOrderState);
router.delete('/:id', ordersController.deleteOrder);
router.get('/:username', ordersController.getOrdersByName);

module.exports = router;
