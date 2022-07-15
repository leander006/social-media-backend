
const express = require('express');
const { follow, unfollow, like, unLike } = require('../controllers/mediaController');
const router = express.Router();

const {allUser, particularUser,groupUser, updateUser, loginUser} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
router.get("/",protect,groupUser)
router.put("/update",protect,updateUser)
router.put("/addFollower/:id",protect,follow)
router.put("/removeFollower/:id",protect,unfollow)
router.put("/likePost/:id",protect,like)
router.get("/loginUser",protect,loginUser)

 
module.exports = router;