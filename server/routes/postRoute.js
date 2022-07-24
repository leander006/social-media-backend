
const express = require('express');
const { createPost, getPost, particularPost, deletePost, followingPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { uploadPost } = require('../middleware/postPicUpload');
const router = express.Router();


router.post("/",uploadPost.single('content'),protect,createPost)
router.get("/",protect,getPost)
router.get("/:id",protect,particularPost)
router.delete("/delete/:id",protect,deletePost)
router.get("/following/Post",protect,followingPost)





module.exports = router;