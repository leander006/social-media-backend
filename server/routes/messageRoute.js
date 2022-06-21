
const express = require('express');
const { sendMessage,allMessages } = require('../controllers/messageController');
const router = express.Router();


const { protect } = require('../middleware/authMiddleware');


router.post("/:chatId",protect,sendMessage)
router.get("/get/:chatId",protect,allMessages)
// router.post("/login",login)

 
module.exports = router;