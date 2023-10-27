const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  // ** Owner informations
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
 
  // **-----------------------------------------
  // ** status
  published: {
    // ** Done
    // ** product visible or not in ecommerce
    type: Boolean,
    default: false,
  },
 

  name: {
    // ** Done
    type: String,
    required: true,
    default: "",
  },
  link: {
    // ** Done
    type: [String],
    required: true,
   
  },

  size: {
    type: [{ type: String }],
    default: [],
  },

  dimensions: {
    type: [{ type: String }],
    default: [],
  },
  // **-----------------------------------------
  // ** Delivery informations

  // **-----------------------------------------
  // ** Additonal informations
  description: {
    type: String,
    required: false,
  },

  rating: {
    type: Number,
    default: 0,
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

const Degats = mongoose.model("File", ProductSchema);
module.exports = Degats;
