const express = require("express");
const { authenticate } = require("../config/authenticate");
const { like, bookmark } = require("../controllers/mediaController");
const {
  createPost,
  getPost,
  particularPost,
  deletePost,
  followingPost,
  likePost,
  bookmarkPost,
  uploadPost,
} = require("../controllers/postController");

// const { uploadPost } = require('../middleware/postPicUpload');
const router = express.Router();

router.post("/", authenticate, createPost);
router.post("/postUpload/postImg", authenticate, uploadPost);
router.get("/", authenticate, getPost);
router.get("/:id", authenticate, particularPost);
router.put("/bookmarkPost/:id", authenticate, bookmark);
router.delete("/delete/:id", authenticate, deletePost);
router.get("/following/Post", authenticate, followingPost);
router.get("/liked/Post", authenticate, likePost);
router.get("/bookmark/Post", authenticate, bookmarkPost);

module.exports = router;
