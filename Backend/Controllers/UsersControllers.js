const UsersModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const UserValid = require("../Utils/UsersValidation");
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret_key'; 

let Register = async (req, res) => {
  let foundUser = await UsersModel.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (foundUser) return res.send("User Already Exist, Please Login");

  let salt = await bcrypt.genSalt(10);
  let HashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = HashedPassword;

  req.body.email = req.body.email.toLowerCase();

  let ReqUser = req.body;

  if (UserValid(ReqUser)) {
    let newUser = new UsersModel(ReqUser);
    newUser.save();
    return res
      .status(201)
      .json({ message: "User Registerd Successfully", data: newUser });
  }

  return res.send(
    UserValid.errors[0].instancePath.split("/")[1] +
      ": " +
      UserValid.errors[0].keyword +
      " ==> " +
      UserValid.errors[0].message
  );
};

let Login = async (req, res) => {
  try {
    let foundUser = await UsersModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (!foundUser) {
      return res.status(401).json({ error: "User not found" });
    }

    let passTrue = await bcrypt.compare(req.body.password, foundUser.password);

    if (!passTrue) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: foundUser._id }, jwtSecret, { expiresIn: '5h' });

    return res.json({ message: "Logged-In Successfully", token });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

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

    const updatedUser = await UsersModel.findOneAndUpdate(
      { _id: userId },
      newData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    return res
      .status(200)
      .json({ message: "Updated Successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) ||5;
    const users = await UsersModel.find({})
              .skip((page - 1) * pageSize)
              .limit(pageSize)
              .exec();
    const countUsers=await UsersModel.countDocuments();
    return res.status(200).json({ data: users,countUsers:countUsers});
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UsersModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

//---------search by name-----------------//

let GetUserByName = async (req, res) => {
  try {
   
    
    let searchPattern = new RegExp(req.params.fullname, 'i'); 

    let users = await UsersModel.find({ fullname: { $regex: searchPattern } });

    return res.status(200).json({ users: users});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Server fail" });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UsersModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  Register,
  Login,
  updateUserById,
  getUserById,
  deleteUserById,
  GetUserByName,
  getAllUsers,
};
