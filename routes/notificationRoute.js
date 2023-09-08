const express = require("express");
const { authenticate } = require("../config/authenticate");

const {
  setNotifications,
  getNotifications,
  removeNotifications,
  getNotificationsById,
  getByMessageId,
} = require("../controllers/notifyController");
const router = express.Router();

router.post("/:id", authenticate, setNotifications);
router.get("/", authenticate, getNotifications);
router.get("/:id", getNotificationsById);
router.delete("/:id", authenticate, removeNotifications);

module.exports = router;
