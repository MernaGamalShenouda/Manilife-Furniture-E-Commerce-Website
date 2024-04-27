const Ajv = require("ajv");
const ajv = new Ajv();

ajv.addFormat("email", (data) => {
    // Custom email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  });

let UsersSchema = {
    type: "object",
    properties: {
      username: { type: "string" },
      fullname: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
      image: { type: "string" },
      gender: { type: "string" },
      cart: {
        anyOf: [
          { type: "null" }, // Allow null
          {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: { type: "string" },
                quantity: { type: "number" }
              },
              required: ["productId", "quantity"]
            }
          }
        ]
      }
    },
    required: ["username", "fullname", "email", "password", "gender"],
    // additionalProperties: false
};
  
module.exports = ajv.compile(UsersSchema); 
