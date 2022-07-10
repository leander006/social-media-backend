const express = require('express');
const { createPost, getPost, particularPost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/",protect,createPost)
router.get("/",protect,getPost)
router.get("/:id",protect,particularPost)
router.delete("/delete/:id",protect,deletePost)





module.exports = router;