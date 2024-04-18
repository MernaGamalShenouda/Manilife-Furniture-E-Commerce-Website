
let ProductsModel=require("../Model/Products.Model");

let ProductsValiation=require("../Utils/ProductsValidation")


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
let CeateProducts=(req,res)=>{
    
    try{

         let newProduct=req.body;

           if(ProductsValiation(newProduct)){
            
                let createProduct=new ProductsModel(newProduct);
                  createProduct.save();
            
            return  res.status(201).
                json({'Message':"Product created successfully!",'Product':newProduct})
        }else{

            return res.status(404).
                json({'Message':`${ProductsValiation.errors[0].instancePath.split("/")[1]} ${ProductsValiation.errors[0].message}`})

        }

    }catch(err)
    {
        console.error(err);
        return res.status(500).
            json({ err: 'Server fail' });
    }
    
};















//-------export functions----------------------
module.exports={
    GetAllProducts,
    CeateProducts
}