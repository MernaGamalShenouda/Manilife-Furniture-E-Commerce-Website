const mongoose=require('mongoose');



//#region  Defination Schema of products

//----------Details Schema------------------------------
const DetailsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    reviews: [{
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        }
    }]
});



//-----------Products Schema--------------------------
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    details: {
        type: DetailsSchema, 
        required: true
    }
});



module.exports=mongoose.model("Products",ProductSchema);