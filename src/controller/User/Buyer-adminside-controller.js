"use strict";
const bcrypt = require("bcryptjs");
//-------------------------------------------
// const Supplier = require("../../model/Supplier/Supplier-model");
const User = require("../../model/User/User-model");
//----------------------------------------------------------------------------
// @desc    get all buyers
// @route   POST /api/buyer/get/all
// @access  private
// @Role    admin
const getAllBuyer = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    const count = (await User.find()).length;
    const items = await User.find()
      .skip(page * limit)
      .limit(limit);
    return res.json({
      Message: "Retrived successfully",
      count,
      items,
      offset: page * limit,
      size: items.length,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    get one buyer
// @route   GET /api/buyer/get/one/:_id
// @access  private
// @Role    admin
const getOneBuyer = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Missing required params" });
    }
    const getUser = await User.findOne({ _id });
    if (!getUser) {
      return res.status(400).json({ Message: "Failed to retrive buyer" });
    }
    return res
      .status(200)
      .json({ Message: "Buyer retrived successfully", item: getUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    suspend buyer
// @route   PUT /api/buyer/update/suspend/:_id
// @access  private
// @Role    admin
const suspendOrUnsuspendUser = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Missing required params" });
    }
    const { suspended } = req.body;
    if (suspended !== false || suspended !== true) {
      return res
        .status(406)
        .json({ Message: "Please provide all requires information" });
    }
    const updateBuyer = await User.findOneAndUpdate(
      { _id },
      { suspended },
      { new: true }
    );
    if (!updateBuyer) {
      return res.status(400).json({
        Message: suspended ? "failed to  suspended" : "failed to unsuspended",
      });
    }
    return res.status(200).json({
      Message: suspended
        ? "Suspended successfully"
        : "Unsuspended successfully",
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
module.exports = { getAllBuyer, getOneBuyer, suspendOrUnsuspendUser };
