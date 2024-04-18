const express = require('express');
const router = express.Router();

const ProductsController=require("../Controllers/ProductsController")





//----------------------routes---------------------------
router.get('/',ProductsController.GetAllProducts);
router.post('/',ProductsController.CeateProducts)









module.exports=router;



