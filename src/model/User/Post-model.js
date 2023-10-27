const mongoose = require("mongoose");
const PostSchema = new mongoose.PostSchema({
  buyerId: {
    //dropdown
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "buyer",
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Group",
  },
  content: {
    type: String,
    required: true,
  },
  galery: {
    type: [{ type: String }],
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: null,
  },
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
