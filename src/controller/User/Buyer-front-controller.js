"use strict";
const bcrypt = require("bcryptjs");
//-------------------------------------------
// const Supplier = require("../../model/Supplier/Supplier-model");
const Buyer = require("../../model/User/User-model");
//----------------------------------------------------------------------------
// @desc    update buyer general
// @route   PUT /api/buyer/update/general
// @access  private
// @Role    admin
const updateBuyerGeneralInfo = async (req, res) => {
  try {
    // ** Get buyer _id
    const { _id } = req.buyer;
    if (_id === undefined) {
      return res.status(403).json({ Message: "Not loged in" });
    }
    // ** get buyer informations
    const { firstName, lastName, gender } = req.body;
    if (!firstName || !lastName || !gender) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** update the informations
    const updateBuyer = await Buyer.findOneAndUpdate(
      { _id },
      { firstName, lastName, gender },
      { new: true }
    );
    if (!updateBuyer) {
      return res.status(400).json({ Message: "Failed to update general info" });
    }
    // ** ==>
    return res
      .status(200)
      .json({ Message: "General info updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    update buyer phoneNumber
// @route   PUT /api/buyer/update/phoneNumber
// @access  private
// @Role    admin
const updateBuyerPhoneNumber = async (req, res) => {
  try {
    // ** Get buyer _id
    const { _id } = req.buyer;
    if (_id === undefined) {
      return res.status(403).json({ Message: "Not loged in" });
    }
    // ** get new phone number
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** find match
    const matchPhoneNumberBuyer = await Buyer.findOne({ phoneNumber }); // ** for buyers
    // const matchPhoneNumberSupplier = await Supplier.findOne({ phoneNumber }); // ** for suppliers
    if (matchPhoneNumberBuyer || matchPhoneNumberSupplier) {
      return res.status(409).json({ Message: "Phone number already used" });
    }
    // ** update
    const updatebBuyer = await Buyer.findOneAndUpdate(
      { _id },
      {
        phoneNumber,
      },
      { new: true }
    );
    if (!updatebBuyer) {
      return res
        .status(400)
        .json({ Message: "Phone number updated successfully" });
    }
    // ** ==>
    return res
      .status(200)
      .json({ Message: "Phone number updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    update buyer phoneNumber
// @route   PUT /api/buyer/update/phoneNumber
// @access  private
// @Role    admin
const updateBuyerEmail = async (req, res) => {
  try {
    // ** Get buyer _id
    const { _id } = req.buyer;
    if (_id === undefined) {
      return res.status(403).json({ Message: "Not loged in" });
    }
    // ** get email
    const { email } = req.body;
    if (!email) {
      return res
        .status(406)
        .json({ Message: "Please provide all required information" });
    }
    // ** Check if the email used
    const findEmailBuyer = await Buyer.findOne({ email });
    const findEmailSupplier = await Buyer.findOne({ email });
    if (findEmailBuyer || findEmailSupplier) {
      return res.status(409).json({ Message: "Email already used" });
    }
    // ** update email
    const updateBuyer = await Buyer.findOneAndUpdate(
      { _id },
      {
        email,
      },
      { new: true }
    );
    if (!updateBuyer) {
      return res.status(400).json({ Message: "Failed to update email" });
    }
    // ** ==>
    return res.status(200).json({ Message: "email updated suucessfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    update buyer password
// @route   PUT /api/buyer/update/password/:_id
// @access  private
// @Role    admin
const updateBuyerPassword = async (req, res) => {
  try {
    // ** get buyer _id
    const { _id, password } = req.buyer;
    if (_id === undefined) {
      return res.status(403).json({ Message: "Not loged in" });
    }
    // ** get passwords
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(422).json({ Message: "2 passwords don't match" });
    }
    // ** compare the old password
    const comparePassword = await bcrypt.compare(oldPassword, password);
    if (!comparePassword) {
      return res.status(409).json({ Message: "Wrong old password!" });
    }
    // ** hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    // ** update password
    const updateBuyer = await Buyer.findOneAndUpdate(
      { _id },
      {
        password: hash,
      },
      { new: true }
    );
    if (!updateBuyer) {
      return res.status(400).json({ Message: "Failed to update password." });
    }
    // ** Send email to the buyer that the password has been updated
    // ** ==>
    return res.status(200).json({ Message: "Password updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
module.exports = {
  updateBuyerGeneralInfo,
  updateBuyerPhoneNumber,
  updateBuyerEmail,
  updateBuyerPassword,
};
