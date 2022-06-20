
const express = require('express');
const router = express.Router();

const {allUser, particularUser} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


router.get("/",protect,allUser)
router.get("/oneUser",protect,particularUser)
// router.post("/login",login)

 
module.exports = router;