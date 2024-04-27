const AJV = require("ajv");
const ajv = new AJV();

//#region Schema AJV

//----------Details Schema------------------------------
const DetailsSchema = {
    type: "object",
    properties: {
        description: { type: "string" ,minLength:3},
        reviews: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    rating: { type: "number",minimum:0,maximum:5 },
                    review: { type: "string" }
                },
                required: ["rating", "review"]
            }
        }
    },
    required: ['description', 'reviews'],
    additionalProperties: false
};

//-----------Products Schema--------------------------
const ProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" , minLength: 3},
        price: { type: "number",minimum:0 },
        category: { type: "string" ,minLength:3},
        quantity: { type: "number",minimum:0  },
        images: { type: "string" },
        details: { $ref: "#/definitions/DetailsSchema" }
    },
    required: ['title', 'price', 'category', 'quantity', 'images', 'details'],
    additionalProperties: false,
    definitions: {
        DetailsSchema
    }
};

//#endregion Schema AJV

module.exports=ajv.compile(ProductSchema);
