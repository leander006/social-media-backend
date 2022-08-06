
const express = require('express');
const router = express.Router();
const passport = require("passport");
const generateToken = require('../config/authToken');
const {registration,login} = require("../controllers/authController")


router.post("/register",registration)

router.post("/login",login)

//-----google------//


// router.get("/login/success", (req, res) => {
//       console.log("/login/success");
//       if (req.user) {
        
//         res.status(200).json({
//           success: true,
//           message: "successfull",
//           user: req.user,
//           cookies: req.cookies
//         });
//       }
//     });
    
//     router.get("/login/failed", (req, res) => {
//         console.log("failed");
//       res.status(401).json({
//         success: false,
//         message: "failure",
//       });
//     });


    router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      const token=generateToken(req.user._id);
      res.cookie("token",token,{ expires: new Date(Date.now() + 25892000000),
       secure:process.env.NODE_ENV === "production"?true:false,
       httpOnly:process.env.NODE_ENV === "production"?true:false,})
       res.cookie("data",JSON.stringify(req.user),{ expires: new Date(Date.now() + 25892000000),
           secure:process.env.NODE_ENV === "production"?true:false,
           httpOnly:process.env.NODE_ENV === "production"?true:false,})
      //  .status(200).json({others})
      res.redirect("http://localhost:3000/home");
    });

    router.get("/logout", (req, res) => {
      req.logout();
      console.log("logout");
      res.redirect("http://localhost:3000");
    });
    
    router.get("/google", passport.authenticate("google", { scope: [ 'email' ] }));

    
   
    
//--------------//
 
module.exports = router;