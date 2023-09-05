const express = require("express");
const { authenticate } = require("../config/authenticate");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addMember,
  removeMember,
  deleteChat,
} = require("../controllers/chatController");
// const { setNotifications, getNotifications } = require('../controllers/notifyController');
const router = express.Router();

router.post("/:id", authenticate, accessChat);
router.get("/", authenticate, fetchChat);
router.post("/", authenticate, createGroupChat);
router.put("/rename/:id", authenticate, renameGroup);
router.put("/add/:id", authenticate, addMember);
router.put("/remove/:id", authenticate, removeMember);
router.delete("/delete/:id", authenticate, deleteChat);

module.exports = router;
