const express = require('express');
const router = express.Router();
const upload = require("../Middleware/multer");


const UploadPhotoController=require("../Controllers/UploadPhotoController")



router.post('/upload', upload.single('image'),UploadPhotoController.uploadPhoto);




module.exports=router;
