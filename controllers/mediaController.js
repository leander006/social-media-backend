const asyncHandler = require("express-async-handler");

const Post = require("../model/Post");
const User = require("../model/User");

const { NODE_ENV } = require("../config/serverConfig");

//Add followers and Remove followers//
const follow = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = req.user;
    var newUser = {};
    if (!user.followers.includes(req.user._id)) {
      await user.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      newUser = await User.findById(currentUser._id);
      return (
        res
          // .cookie("data", JSON.stringify(newUser), {
          //   sameSite: "none",
          //   secure: true,
          //   expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
          // })
          .status(200)
          .json(newUser)
      );
    } else {
      await user.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      newUser = await User.findById(currentUser._id);
      return (
        res
          // .cookie("data", JSON.stringify(newUser), {
          //   sameSite: "none",
          //   secure: true,
          //   expire: new Date(Date.now() + 24 * 60 * 60 * 1000),
          // })
          .status(200)
          .json(newUser)
      );
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//bookmark and remove bookmark //

const bookmark = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user._id);
  try {
    if (!post.bookmarked.includes(req.user._id)) {
      await post.updateOne({ $push: { bookmarked: req.user._id } });
      await user.updateOne({ $push: { bookmarkedPost: req.params.id } });
    } else {
      await post.updateOne({ $pull: { bookmarked: req.user._id } });
      await user.updateOne({ $pull: { bookmarkedPost: req.params.id } });
    }
    const newUser = await User.findById(req.user._id);
    // console.log("new user ", newUser);
    res
      // .cookie("data", JSON.stringify(newUser), {
      //   sameSite: "none",
      //   secure: true,
      //   expire: new Date(Date.now() + 60 * 60 * 1000),
      // })
      .status(200)
      .json(newUser);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = {
  follow,
  bookmark,
};
