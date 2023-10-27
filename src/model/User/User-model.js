const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  // **-----------------------------------------
  // ** Naming informations
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  gender: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // **-----------------------------------------
  // ** *Contact informations
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  // **-----------------------------------------
  // ** Security informations
  password: {
    type: String,
    required: true,
  },
  // **-----------------------------------------
  // ** Checked on loging
  Language: {
    type: String,
    default: "FR",
  },

 
  // **-----------------------------------------
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: null,
  },
  // **-----------------------------------------
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
