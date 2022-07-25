
const express = require('express');
const { follow, unfollow, like, unLike } = require('../controllers/mediaController');
const router = express.Router();
const {allUser, particularUser,groupUser, updateUser, loginUser, userById} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/profilePicUpload');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
router.get("/",protect,groupUser)
router.get("/:id",protect,userById)
router.put("/update",upload.single('profile'),protect,updateUser)
router.put("/addFollower/:id",protect,follow)
router.put("/removeFollower/:id",protect,unfollow)
router.get("/loginUser",protect,loginUser)

 
module.exports = router;