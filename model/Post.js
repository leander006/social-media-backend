const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      req: true,
    },
    caption: {
      type: String,
      trim: true,
      req: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    bookmarked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

PostSchema.pre("remove", function (next) {
  this.model("Comment").remove({ commentable: this._id }, next);
});

module.exports = mongoose.model("Post", PostSchema);
