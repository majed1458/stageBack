"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//-------------------------------------------
const Buyer = require("../../model/User/User-model");
// const Supplier = require("../../model/Supplier/Supplier-model");
// const Address = require("../../model/Buyer/Buyer-adresses-model");
//-------------------------------------------
const SendVerifyAccountEmail = require("../../emails/buyer/VerifyAccount");
const SendResetPasswordLink = require("../../emails/buyer/ResetPassword");
const SendWelcomingEmail = require("../../emails/buyer/WelcomingMail");
const SendPasswordHasChanged = require("../../emails/buyer/PasswordChanged");
//----------------------------------------------------------------------------
// @desc    verify if the supplier is authed or not
// @route   POST /api/auth/reset/send
// @access  public
// @Role    client
const getBuyerByToken = async (req, res) => {
  try {
    const buyer = req.buyer;
    if (!buyer) {
      return res.status(400).json({ Message: "User not found" });
    }

 
     
    // ** ==>
    return res.status(200).json({
      Message: "User retrived successfully",
      item: {
       
        data: buyer,
      },
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    sign up buyer
// @route   POST /api/auth/reset/send
// @access  public
// @Role    client
const signUpBuyer = async (req, res) => {
  try {
    // ** get informations
    const {
      gender,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      verified, // ** check if it's google authed or not
    } = req.body;
    if (
      !gender ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password
    ) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** Check if email already used
    const findEmailBuyer = await Buyer.findOne({ email }); // ** by buyers
    // const findEmailSupplier = await Supplier.findOne({ email }); // ** by suppliers
    if (findEmailBuyer ) {
      return res.status(422).json({ Message: "Email already used" });
    }
    // ** Check if phone number already used
    const findPhoneBuyer = await Buyer.findOne({ phoneNumber }); // ** by buyers
    // const findPhoneSupplier = await Supplier.findOne({ phoneNumber }); // ** by suppliers
    if (findPhoneBuyer) {
      return res.status(409).json({ Message: "Phone number already used" });
    }
    // ** Hash password
    const salt = await bcrypt.genSalt(10); // ** generate salt
    const hash = await bcrypt.hash(password, salt); // ** hash the password
    // ** create new user
    const newBuyer = new Buyer({
      gender,
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hash,
      verified, // ** by default its not verified inleas his google auth
    });
    const create = await newBuyer.save();
    if (!create) {
      return res.status(400).json({ Message: "Failed to create buyer" });
    }
    // ** send verify email password
    const token = await jwt.sign({ _id: create._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    }); // ** prepade token
    // ** If not google auth.
    // if (!verified) {
    //   SendVerifyAccountEmail(email, token); // ** send verification email
    // }
    // ** ==>
    return res.status(201).json({ Message: "User created successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    login buyer
// @route   POST /api/auth/buyer/login
// @access  public
// @Role    client
const signInBuyer = async (req, res) => {
  try {
    // ** Get informations
    const { email, password, remember } = req.body;
    if (!email || !password) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** Check if the email exist.
    const getBuyer = await Buyer.findOne({ email });
    if (!getBuyer) {
      return res.status(409).json({ Message: "This buyer doesn't exist" });
    }
    // ** confirm the password.
    const verifyPassword = await bcrypt.compare(password, getBuyer.password);
    if (!verifyPassword) {
      return res.status(401).json({ Message: "Password is wrong!" });
    }
    // ** Check if the account is suspended
    if (getBuyer.suspended) {
      return res.status(403).json({ Message: "This account is suspended!" });
    }
    // ** Check if the account is verified
    // if (!getBuyer.verified) {
    //   const verifyToken = await jwt.sign(
    //     { _id: getBuyer._id },
    //     process.env.SECRET_KEY,
    //     { expiresIn: "7d" }
    //   ); // ** Prepare verify email token
    //   SendVerifyAccountEmail(email, verifyToken); // ** send
    //   return res.status(203).json({ Message: "This account is not verified" });
    // }
    const getUser = await Buyer.findOne({ _id: getBuyer._id }).select(
      "-password -updateAt -createdAt"
    );
    //** Prepare the token
    const maxAge = remember ? "1y" : "15d";
    const token = jwt.sign(
      { user: getUser, role: "02" },
      process.env.SECRET_KEY,
      { expiresIn: maxAge }
    );
    // ** ==>
    return res.status(200).json({ Message: "Login in successfully", token, user:getUser});
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    verifie buyer
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
const verifyBuyerAccount = async (req, res) => {
  try {
    // ** get token
    const { token } = req.body;
    if (!token) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** decode token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ Message: "Token invalide" });
    }
    // ** check buyer exists
    const getBuyer = await Buyer.findOne({ _id: decoded._id }).select(
      "-password -updateAt -createdAt"
    );
    if (!getBuyer) {
      return res.status(400).json({ Message: "This buyer doesn't exists" });
    }
    // ** Prepare access token in front
    const accessToken = jwt.sign(
      { user: getBuyer, role: "02" },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );
    // ** check if buyer is already verified
    if (getBuyer.verified === true) {
      return res.status(409).json({
        Message: "This buyer is already verified",
        token: accessToken,
      });
    }
    // ** update buyer
    const updateBuyer = await Buyer.findOneAndUpdate(
      { _id: getBuyer._id },
      { verified: true },
      { new: true }
    );
    if (!updateBuyer) {
      return res.status(400).json({ Message: "Failed to verified buyer" });
    }
    // ** Send Welcoming email.
    SendWelcomingEmail(getBuyer.email);
    // ** ==>
    return res
      .status(200)
      .json({ Message: "Buyer verified successfully", token: accessToken });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    forgot password
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
const forgotBuyerPassword = async (req, res) => {
  try {
    // ** get email
    const { email } = req.body;
    if (!email) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** Check if buyer exists
    const getBuyer = await Buyer.findOne({ email });
    if (!getBuyer) {
      return res
        .status(409)
        .json({ Message: "No buyer associated with this email!" });
    }
    // ** Verification token
    const token = await jwt.sign(
      { _id: getBuyer._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );
    // ** send reset password email
    SendResetPasswordLink(email, token);
    // ** ==>
    return res.status(200).json({ Message: "Email was sent successfully!" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    reset buyer password
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
const resetBuyerPassword = async (req, res) => {
  try {
    // ** get token and password
    const { password, token } = req.body;
    if (!password || !token) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    // ** decode token
    const getBuyer = jwt.decode(token, process.env.SECRET_KEY);
    if (!getBuyer) {
      return res.status(403).json({ Message: "Token is invalide" });
    }
    // ** hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // ** update password
    const updatePassword = await Buyer.findOneAndUpdate(
      { _id: getBuyer._id },
      { password: hash },
      { new: true }
    );
    if (!updatePassword) {
      return res.status(400).json({ Message: "Failed to update password" });
    }
    // ** send email to buyer that the password has been changed.
    SendPasswordHasChanged(getBuyer.email);
    // ** valid
    return res.status(200).json({ Message: "Password updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
// @desc    reset buyer password
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
const resendBuyerVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations" });
    }
    const getBuyer = await Buyer.findOne({ email });
    if (!getBuyer) {
      return res.status(404).json({ Message: "This buyer doesn't exists" });
    }
    if (getBuyer.verified) {
      return res
        .status(409)
        .json({ Message: "This buyer is already verified !" });
    }
    // ** send verify email password
    const token = await jwt.sign(
      { _id: getBuyer._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    ); // ** prepade token
    SendVerifyAccountEmail(email, token); // ** send verification email
    // ** valid
    return res.status(200).json({ Message: "Email resent successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------------
module.exports = {
  signUpBuyer,
  getBuyerByToken,
  signInBuyer,
  forgotBuyerPassword,
  verifyBuyerAccount,
  resetBuyerPassword,
  resendBuyerVerificationLink,
};
