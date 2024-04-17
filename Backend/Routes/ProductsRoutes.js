const express = require('express');
const router = express.Router();

const ProductsController=require("../Controllers/ProductsController")





//----------------------routes---------------------------
router.get('/',ProductsController.GetAllProducts);









module.exports=router;



