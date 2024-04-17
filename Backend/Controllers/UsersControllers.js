const UsersModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const UserValid = require("../Utils/UsersValidation");

let Register = async (req, res)=>{
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()});
    if(foundUser) return res.send("User Already Exist, Please Login");

    let salt = await bcrypt.genSalt(10);
    let HashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = HashedPassword;

    req.body.email = req.body.email.toLowerCase();

    let ReqUser = req.body;

    if(UserValid(ReqUser)){
        let newUser = new UsersModel(ReqUser);
        newUser.save();
        return res.status(201).json({message:"User Registerd Successfully", data: newUser})
    }

    return res.send(
            UserValid.errors[0].instancePath.split("/")[1]
            +": "+ 
            UserValid.errors[0].keyword
            +" ==> "+
            UserValid.errors[0].message
        );
}

let Login = async (req, res)=>{
    let foundUser = await UsersModel.findOne({email: req.body.email.toLowerCase()})
    if(!foundUser) return res.send("Invalid Email / Password");

    let passTrue = await bcrypt.compare(req.body.password, foundUser.password)
    if(!passTrue) return res.send("Invalid Email / Password");

    return res.send("Logged-In Successfully")
}

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const newData = {
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image,
            gender: req.body.gender,
            cart: req.body.cart,
        };

        const updatedUser = await UsersModel.findOneAndUpdate({ _id: userId }, newData, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        return res.status(200).json({ message: "Updated Successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error.message);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    Register,
    Login,
    updateUserById
}