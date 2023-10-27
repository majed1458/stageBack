const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  published: {
    type: Boolean,
    default: true,
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

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
