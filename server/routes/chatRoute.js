
const express = require('express');
const { accessChat } = require('../controllers/chatController');
const router = express.Router();


const { protect } = require('../middleware/authMiddleware');


router.post("/:id",protect,accessChat)

// router.post("/login",login)

 
module.exports = router;