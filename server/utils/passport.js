const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const passport = require("passport")
const User =  require("../model/User");
const dotenv = require('dotenv');
dotenv.config();

// For session //

passport.serializeUser((user, done) => {   done(null, user); });
 
passport.deserializeUser((id, done) => {  
      User.findById(id).then((user) => {
      done(null, user);}); 
});

//Google auth
passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID1,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET1,
          callbackURL: "http://localhost:3001/api/auth/google/callback",
        },
            async(accessToken, refreshToken, profile, done) => {
                  console.log("start\n");
             const existingUser = await User.findOne({email:profile._json.email})

            //  console.log("existingUser  ",existingUser);
            console.log("successss\n");
             if(existingUser){
                  // console.log("success1\n",profile);
                  
                  return done(null, existingUser);
             }
             else{
                 const user= new User({ googleId: profile.id ,
                              name:profile._json.name,
                              username:profile._json.name,
                              email:profile._json.email,
                              profile:profile._json.picture,
                              isVerified:profile._json.email_verified
                  })
                  await user.save();
                  return done(null, user)
             }

            }   
        
      )
);



