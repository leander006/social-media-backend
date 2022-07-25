
const express = require('express');
const { like, bookmark } = require('../controllers/mediaController');
const { createPost, getPost, particularPost, deletePost, followingPost, likePost, bookmarkPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPost } = require('../middleware/postPicUpload');
const router = express.Router();


router.post("/",uploadPost.single('content'),protect,createPost)
router.get("/",protect,getPost)
router.get("/:id",protect,particularPost)
router.put("/likePost/:id",protect,like)
router.put("/bookmarkPost/:id",protect,bookmark)
router.delete("/delete/:id",protect,deletePost)
router.get("/following/Post",protect,followingPost)
router.get("/liked/Post",protect,likePost)
router.get("/bookmark/Post",protect,bookmarkPost)



module.exports = router;