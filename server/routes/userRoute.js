
const express = require('express');
const { follow, unfollow, like, unLike } = require('../controllers/mediaController');
const router = express.Router();

const {allUser, particularUser,groupUser} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
router.get("/",protect,groupUser)
router.put("/addFollower/:id",protect,follow)
router.put("/removeFollower/:id",protect,unfollow)
router.put("/likePost/:id",protect,like)
router.put("/unLikePost/:id",protect,unLike)
// router.post("/login",login)

 
module.exports = router;