
let ProductsModel=require("../Model/Products.Model");

let ProductsValidation=require("../Utils/ProductsValidation")


// ----------GetALl Products---------------------------
let GetAllProducts= async(req,res)=>{

    try{

    let Products= await ProductsModel.find();

    return res.status(200).
        json({'Products':Products})

    }catch(err)
    {
        console.error(err);
        return res.status(500).
            json({ err: 'Server fail' });
    }
    
};

// ----------Create Product---------------------------
let CreateProducts=(req,res)=>{
    
    try{

         let newProduct=req.body;

           if(ProductsValidation(newProduct)){
            
                let createProduct=new ProductsModel(newProduct);
                  createProduct.save();
            
            return  res.status(201).
                json({'Message':"Product created successfully!",'Product':newProduct})
        }else{

            return res.status(404).
                json({'Message':`${ProductsValidation.errors[0].instancePath.split("/")[1]} ${ProductsValidation.errors[0].message}`})

        }

    }catch(err)
    {
        console.error(err);
        return res.status(500).
            json({ err: 'Server fail' });
    }
    
};

//-----------search by id-----------//

let GetProductById = async (req, res) => {
    try {
        let product = await ProductsModel.findById(req.params.id);
        return res.status(200).json({ 'Product': product });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Server fail' });
    }
};


//---------search by name-----------------//

let GetProductByName = async (req, res) => {
    try {
        let product = await ProductsModel.findOne({ title: req.params.name });
        return res.status(200).json({ 'Product': product });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Server fail' });
    }
};

// ------------Update Product ----------//


let UpdateProduct = async (req, res) => {
    try {
        let updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ 'Product': updatedProduct });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Server fail' });
    }
};

//-------- delete product-----------------//

let DeleteProduct = async (req, res) => {
    try {
        await ProductsModel.findByIdAndRemove(req.params.id);
        return res.status(200).json({ 'Message': 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err: 'Server fail' });
    }
};

// Add the new functions to the exports

module.exports = {
    GetAllProducts,
    CreateProducts,
    GetProductById,
    GetProductByName,
    UpdateProduct,
    DeleteProduct
    
}















//-------export functions----------------------
module.exports={
    GetAllProducts,
    CreateProducts
}