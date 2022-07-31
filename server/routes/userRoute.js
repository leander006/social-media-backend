
const express = require('express');
const { follow, unfollow } = require('../controllers/mediaController');
const router = express.Router();
const {allUser, particularUser,groupUser, updateUser, loginUser, userById, suggestedUser, uploadPic, friendSearch} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/profilePicUpload');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
router.get("/",protect,groupUser)
router.get("/:id",protect,userById)
router.get("/freind/search",protect,friendSearch)
router.get("/suggesteduser/user",protect,suggestedUser)
router.post("/upload",protect,uploadPic)
router.put("/update/:id",protect,updateUser)
router.put("/addFollower/:id",protect,follow)
router.get("/loginUser",protect,loginUser)

 
module.exports = router;