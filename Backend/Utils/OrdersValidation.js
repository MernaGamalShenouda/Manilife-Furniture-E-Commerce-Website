const Ajv = require("ajv");
const ajv = new Ajv();

let OrdersSchema = {
    type: "object",
    properties: {
    "totalPrice": { type: "number" },
    "state": { type: "string", default: "Pending" },
    // "username": { type: "string" },
    "date": { type: "object" },//fromat:"custom-date-time"
    "productTitles": {
        type: "array",
        items: { type: "string" }
    }
    },
    required: ["totalPrice", "productTitles"],//"username"
    additionalProperties:true
}


    ajv.addFormat('custom-date-time', function(dateTimeString) {
        return !isNaN(Date.parse(dateTimeString));
    });


module.exports = ajv.compile(OrdersSchema); 