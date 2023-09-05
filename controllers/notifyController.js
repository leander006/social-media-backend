const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const Chat = require("../model/Chat");
const Message = require("../model/Message");

const { NODE_ENV } = require("../config/serverConfig");

const setNotifications = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const notification = currentUser.Notifications;
  try {
    if (!notification.includes(req.body.id)) {
      await currentUser.updateOne({ $push: { Notifications: req.body.id } });
      const Users = await User.findById(currentUser._id);
      res
        .cookie("data", JSON.stringify(Users), {
          expires: new Date(Date.now() + 25892000000),
          secure: NODE_ENV === "production" ? true : false,
          httpOnly: NODE_ENV === "production" ? true : false,
        })
        .status(200)
        .json(Users.Notifications);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const removeNotifications = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const notification = currentUser.Notifications;
  try {
    if (notification.includes(req.body.id)) {
      await currentUser.updateOne({ $pull: { Notifications: req.body.id } });
      const Users = await User.findById(currentUser._id);
      res
        .cookie("data", JSON.stringify(Users), {
          expires: new Date(Date.now() + 25892000000),
          secure: NODE_ENV === "production" ? true : false,
          httpOnly: NODE_ENV === "production" ? true : false,
        })
        .status(200)
        .json(Users.Notifications);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getNotifications = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const notification = currentUser.Notifications;
  try {
    var notifications = await Promise.all(
      notification.map((id) => {
        return Message.find({ _id: id })
          .populate("sender")
          .populate("chat")
          .populate({ path: "chat", populate: { path: "users" } });
      })
    );
    res.status(200).json(JSON.stringify(notifications.flat()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  setNotifications,
  getNotifications,
  removeNotifications,
};
