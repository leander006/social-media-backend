const express = require("express");
const { authenticate } = require("../config/authenticate");
const { like } = require("../controllers/likecontroller");
// const { setNotifications, getNotifications } = require('../controllers/notifyController');
const router = express.Router();

router.post("/:id", authenticate, like);

module.exports = router;
