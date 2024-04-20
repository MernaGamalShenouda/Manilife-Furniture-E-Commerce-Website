const express = require("express");
const router = new express.Router();
const UsersController = require("../Controllers/UsersControllers");

router.post("/signup", UsersController.Register);
router.post("/login", UsersController.Login);
router.put("/:id", UsersController.updateUserById);
router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUserById);
router.delete("/:id", UsersController.deleteUserById);

module.exports = router;
