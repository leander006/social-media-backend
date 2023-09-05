const mongoose = require("mongoose");

const likeScheme = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
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

module.exports = mongoose.model("Like", likeScheme);
