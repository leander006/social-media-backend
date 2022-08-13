
const express = require('express');
const { accessChat,fetchChat, createGroupChat,renameGroup,addMember, removeMember, deleteChat } = require('../controllers/chatController');
// const { setNotifications, getNotifications } = require('../controllers/notifyController');
const router = express.Router();


const { protect } = require('../middleware/authMiddleware');


router.post("/:id",protect,accessChat)
router.get("/",protect,fetchChat)
router.post("/",protect,createGroupChat)
router.put("/rename/:id",protect,renameGroup)
router.put("/add/:id",protect,addMember)
router.put("/remove/:id",protect,removeMember)
router.delete("/delete/:id",protect,deleteChat)

 
module.exports = router;