const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const express = require("express");
const googleAuth = require("../controllers/google-authController");
const router = express.Router();
require("dotenv").config();

let userProfile;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

// request at /auth/google, when user click sign-up with google button transferring
// the request to google server, to show emails screen
router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// URL Must be same as 'Authorized redirect URIs' field of OAuth client, i.e: /auth/google/callback
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    res.redirect("/auth/google/success"); // Successful authentication, redirect success.
  }
);

router.get("/success", async (req, res) => {
  const user = await googleAuth.registerWithGoogle(userProfile);
  const token = user.genJWT();
  res.cookie("token", token, {
    sameSite: "none",
    secure: true,
    expire: new Date(Date.now() + 60 * 60 * 1000),
  });
  res.cookie("data", JSON.stringify(user), {
    sameSite: "none",
    secure: true,
    expire: new Date(Date.now() + 60 * 60 * 1000),
  });
  res.redirect("http://localhost:3000/home");
});

router.get("/error", (req, res) => res.send("Error logging in via Google.."));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
