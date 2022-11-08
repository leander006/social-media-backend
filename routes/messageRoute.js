
const express = require('express');
const { sendMessage,allMessages, remove } = require('../controllers/messageController');
const router = express.Router();


const { protect } = require('../middleware/authMiddleware');


router.post("/:chatId",protect,sendMessage)
router.get("/get/:chatId",protect,allMessages)
router.delete("/delete/:id",protect,remove)

 
module.exports = router;