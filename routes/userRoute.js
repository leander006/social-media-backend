const express = require("express");
const { follow } = require("../controllers/mediaController");
// const { setNotifications, getNotifications, removeNotifications } = require('../controllers/notifyController');
const router = express.Router();
const {
  allUser,
  particularUser,
  groupUser,
  updateUser,
  loginUser,
  userById,
  suggestedUser,
  uploadPic,
  friendSearch,
  token,
  followingUser,
  followerUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
// const { upload } = require('../middleware/profilePicUpload');

router.get("/", protect, allUser);
router.get("/oneUser", protect, particularUser);
router.get("/", protect, groupUser);
router.get("/:id", protect, userById);
router.get("/freind/search", protect, friendSearch);
router.get("/suggesteduser/user", protect, suggestedUser);
router.post("/upload", protect, uploadPic);
router.put("/update/:id", protect, updateUser);
router.put("/addFollower/:id", protect, follow);
router.get("/loginUser/user", protect, loginUser);
// router.put("/notification/notify",protect,setNotifications)
// router.get("/notification/notify",protect,getNotifications)
// router.put("/notification/remove",protect,removeNotifications)
router.get("/followers/getAll", protect, followerUser);
router.get("/following/getAll", protect, followingUser);
router.get("/:id/verify/:token", token);

module.exports = router;
