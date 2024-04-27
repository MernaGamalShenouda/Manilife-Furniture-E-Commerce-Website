const ProductsModel = require("../Models/Products.Model");

const  ProductsValidation=require("../Utils/ProductsValidation")



// ----------GetALl Products---------------------------
let GetAllProducts = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) ||5;
  try {

    let countProducts= await ProductsModel.countDocuments();
    let categories = await ProductsModel.distinct('category');
    // console.log(categories);
    let Products= await ProductsModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

    return res.status(200).json({ Products: Products,countProducts:countProducts ,categories:categories});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};



// ----------Create Product---------------------------
let CreateProducts = (req, res) => {
  try {
    let newProduct = req.body;
    if (ProductsValidation(newProduct)) {
      let createProduct = new ProductsModel(newProduct);
      createProduct.save();

      return res
        .status(201)
        .json({
          Message: "Product created successfully!",
          Product: newProduct,
        });
    } else {
      return res
        .status(404)
        .json({
          Message: `${
            ProductsValidation.errors[0].instancePath.split("/")[1]
          } ${ProductsValidation.errors[0].message}`,
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};

//-----------search by id-----------//

let GetProductById = async (req, res) => {
  try {
    let product = await ProductsModel.findById(req.params.id);
    return res.status(200).json( product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};

//---------search by name-----------------//

let GetProductByName = async (req, res) => {
  try {
   
    let searchPattern = new RegExp(req.params.title, 'i'); 

    let products = await ProductsModel.find({ title: { $regex: searchPattern } });

    return res.status(200).json({ Product: products});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};


// ------------Update Product ----------//

let UpdateProduct = async (req, res) => {
  try {
    let newProduct = req.body;
    if (ProductsValidation(newProduct)) {
      let updatedProduct = await ProductsModel.findByIdAndUpdate(
        req.params.id,
        newProduct,
        { new: true }
      );

      return res.status(200).json({ Product: updatedProduct });
    } else {
      return res
        .status(404)
        .json({
          Message: `${
            ProductsValidation.errors[0].instancePath.split("/")[1]
          } ${ProductsValidation.errors[0].message}`,
        });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};

//-------- delete product-----------------//

let DeleteProduct = async (req, res) => {
  try {
    await ProductsModel.findOneAndDelete({ _id: req.params.id }, { new: true });
    return res.status(200).json({ Message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};

//-------export functions----------------------
module.exports = {
  GetAllProducts,
  CreateProducts,
  GetProductById,
  GetProductByName,
  UpdateProduct,
  DeleteProduct,
};
