const express = require("express");
const router = express.Router();

const {
  registration,
  login,
  logout,
  callback,
  google,
  callFunction,
} = require("../controllers/authController");

router.post("/register", registration);

router.post("/login", login);

//-----google------//

router.get("/google/callback", callback, callFunction);
router.get("/logout", logout);

router.get("/google", google);

//--------------//

module.exports = router;
