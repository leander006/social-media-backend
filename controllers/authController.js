const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../config/authToken");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Token = require("../model/Token");
// register //

const registration = asyncHandler(async (req, res) => {
  const { username, email, password, name } = req.body;

  if (!username || !email || !password || !name) {
    return res.status(401).json({ error: "Please enter all  field" });
  }

  const userExist = await User.findOne({ username: username });
  const emailExist = await User.findOne({ email: email });

  try {
    if (userExist) {
      return res.status(400).send({ message: "Username Exists" });
    } else if (emailExist) {
      return res.status(400).send({ message: "Email Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
      name: name,
    });

    const user = await newUser.save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify email", url);

    res.status(200).send({ message: "An email send for verification" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// login //

const login = asyncHandler(async (req, res) => {
  const { username } = req.body;
  console.log(req.body.password);
  try {
    if (!username || !req.body.password) {
      return res.status(402).send({ message: "Please all field" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "User does not exits!" });
    }
    const validate = bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(402).send({ message: "Invalid password" });
    }
    //Send confirmation email//
    let tokens = await Token.findOne({ userId: user._id });
    if (user.isVerified === "false") {
      if (tokens) {
        return res
          .status(401)
          .send({ message: "Email not verified check your gmail!" });
      } else {
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify email", url);
        return res
          .status(402)
          .send({ message: "Email send check your gmail!" });
      }
    }
    if (user.isVerified === "true") {
      const { password, ...others } = user._doc;
      const token = generateToken(user.id);
      res.cookie("token", token);
      res
        .cookie("data", JSON.stringify(others))
        .status(200)
        .json({ others });
    }

    // //------------------------------------------//
  } catch (error) {
    res.status(501).send({ message: error.message });
    console.log(error);
  }
});

const logout = (req, res) => {
  req.logout();
  console.log("logout");
  res.redirect(process.env.CLIENT_URL);
};

const callback = passport.authenticate("google", { failureRedirect: "/login" });

const google = passport.authenticate("google", { scope: ["email"] });

const callFunction = (req, res) => {
  // Successful authentication, redirect home.
  const token = generateToken(req?.user?._id);
  res.cookie("token", token);
  res.cookie("data", JSON.stringify(req.user));
  //  .status(200).json({others})
  res.redirect(process.env.CLIENT_URL);
};
module.exports = {
  registration,
  login,
  logout,
  google,
  callback,
  callFunction,
};
