const express = require('express');
const { createPost, getPost, particularPost, deletePost, followingPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/",protect,createPost)
router.get("/",protect,getPost)
router.get("/:id",protect,particularPost)
router.delete("/delete/:id",protect,deletePost)
router.get("/following/Post",protect,followingPost)





module.exports = router;