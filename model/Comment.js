const mongoose = require("mongoose");

const commentScheme = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
    commentable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentScheme);
