const express = require('express');
const { createComment, getComment, getParticularComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post("/:id",protect,createComment)
router.get("/allComment/:id",protect,getComment)
router.get("/:id",protect,getParticularComment)

router.delete("/delete/:id",protect,deleteComment)

module.exports = router;