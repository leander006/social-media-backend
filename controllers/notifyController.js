const User = require("../model/User");
const asyncHandler = require("express-async-handler");
const Chat = require("../model/Chat");
const Message = require("../model/Message");

const { NODE_ENV } = require("../config/serverConfig");
const Notification = require("../model/Notification");

const setNotifications = asyncHandler(async (req, res) => {
  const ModelType = req.body.type;
  const ModelId = req.params.id;
  const user = req.user._id;
  try {
    const notify = await Notification.create({
      onModel: ModelType,
      notify: ModelId,
      user: user,
    });
    res.status(201).json(notify);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const removeNotifications = asyncHandler(async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted notifications");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).populate("notify");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  setNotifications,
  getNotifications,
  removeNotifications,
};
