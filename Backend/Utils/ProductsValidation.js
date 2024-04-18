const AJV = require("ajv");
const ajv = new AJV();

//#region Schema AJV

//----------Details Schema------------------------------
const DetailsSchema = {
    type: "object",
    properties: {
        description: { type: "string" },
        manufacturer: { type: "string" },
        reviews: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    rating: { type: "number" },
                    review: { type: "string" }
                },
                required: ["rating", "review"]
            }
        }
    },
    required: ['description', 'manufacturer', 'reviews'],
    additionalProperties: false
};

//-----------Products Schema--------------------------
const ProductSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        price: { type: "number" },
        category: { type: "string" },
        quantity: { type: "number" },
        image: { type: "string" },
        details: { $ref: "#/definitions/DetailsSchema" }
    },
    required: ['title', 'price', 'category', 'quantity', 'image', 'details'],
    additionalProperties: false,
    definitions: {
        DetailsSchema
    }
};

//#endregion Schema AJV

module.exports=ajv.compile(ProductSchema);
