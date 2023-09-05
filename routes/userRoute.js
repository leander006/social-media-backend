const express = require("express");
const { authenticate } = require("../config/authenticate");
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

// const { upload } = require('../middleware/profilePicUpload');

router.get("/", authenticate, allUser);
router.get("/oneUser", authenticate, particularUser);
router.get("/", authenticate, groupUser);
router.get("/:id", authenticate, userById);
router.get("/freind/search", authenticate, friendSearch);
router.get("/suggesteduser/user", authenticate, suggestedUser);
router.post("/upload", authenticate, uploadPic);
router.put("/update/:id", authenticate, updateUser);
router.put("/addFollower/:id", authenticate, follow);
router.get("/loginUser/user", authenticate, loginUser);
// router.put("/notification/notify",authenticate,setNotifications)
// router.get("/notification/notify",authenticate,getNotifications)
// router.put("/notification/remove",authenticate,removeNotifications)
router.get("/followers/getAll", authenticate, followerUser);
router.get("/following/getAll", authenticate, followingUser);
router.get("/:id/verify/:token", token);

module.exports = router;
