const mongoose = require("mongoose");

const notificationScheme = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Like", "Message", "Post"],
    },
    notify: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationScheme);
