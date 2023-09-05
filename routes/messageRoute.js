const express = require("express");
const { authenticate } = require("../config/authenticate");
const {
  sendMessage,
  allMessages,
  remove,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/:chatId", authenticate, sendMessage);
router.get("/get/:chatId", authenticate, allMessages);
router.delete("/delete/:id", authenticate, remove);

module.exports = router;
