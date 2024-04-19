const express = require('express');
const router = express.Router();

const ProductsController=require("../Controllers/ProductsController")





//----------------------routes---------------------------
router.get('/',ProductsController.GetAllProducts);
router.post('/',ProductsController.CreateProducts);
router.get('/:id', ProductsController.GetProductById);
router.get('/name/:title', ProductsController.GetProductByName);
router.put('/:id', ProductsController.UpdateProduct);
router.delete('/:id', ProductsController.DeleteProduct);








module.exports=router;



