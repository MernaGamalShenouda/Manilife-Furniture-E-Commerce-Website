
let ProductsModel=require("../Model/Products.Model");


// ----------GetALl Products---------------------------
let GetAllProducts= async(req,res)=>{

    let Products= await ProductsModel.find();
    return res.status(200).json({data:Products})
};















//-------export functions----------------------
module.exports={
    GetAllProducts
}