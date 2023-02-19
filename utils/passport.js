const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const { randomBytes } = require("crypto");
const User = require("../model/User");

// For session //

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("profile ", profile);
      try {
        const existingUser = await User.findOne({ email: profile._json.email });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          const user = new User({
            googleId: profile.id,
            name: profile._json.name ? profile._json.name : "xyz",
            username: profile._json.name
              ? profile._json.name
              : "https://res.cloudinary.com/dttldcyp8/image/upload/v1676618773/ZenX/whrahslbvsmqrvcbrrs2.svg",
            email: profile._json.email,
          });
          await user.save();
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
