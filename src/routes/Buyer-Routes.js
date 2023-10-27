const express = require("express");
const asyncHandler = require("express-async-handler");
//----------------------------------------------------------------------------
// ** Front side
const {
  updateBuyerGeneralInfo,
  updateBuyerPhoneNumber,
  updateBuyerEmail,
  updateBuyerPassword,
} = require("../controller/User/Buyer-front-controller");
// ** Address

// ** Admin side
const {
  getAllBuyer,
  getOneBuyer,
  suspendOrUnsuspendBuyer,
} = require("../controller/User/Buyer-adminside-controller");
//----------------------------------------------------------------------------
// **Middleware
const verifyBuyerAccess = require("../middelware/VerifyBuyerAccess");
//----------------------------------------------------------------------------
const router = express.Router();
//----------------------------------------------------------------------------
// @desc    update profile general informations
// @route   POST /api/category/:groupId
// @access  private
// @Role    admin
router.put(
  "/profile/name",
  asyncHandler(verifyBuyerAccess),
  asyncHandler(updateBuyerGeneralInfo)
);


//----------------------------------------------------------------------------
// @desc    update profile email
// @route   POST /api/category/:groupId
// @access  private
// @Role    admin
router.put(
  "/profile/email",
  asyncHandler(verifyBuyerAccess),
  asyncHandler(updateBuyerEmail)
);
//----------------------------------------------------------------------------
// @desc    update profile phone number
// @route   POST /api/category/:groupId
// @access  private
// @Role    admin
router.put(
  "/profile/phoneNumber",
  asyncHandler(verifyBuyerAccess),
  asyncHandler(updateBuyerPhoneNumber)
);
//----------------------------------------------------------------------------
// @desc    update profile password.
// @route   POST /api/category/:groupId
// @access  private
// @Role    admin
router.put(
  "/profile/password",
  asyncHandler(verifyBuyerAccess),
  asyncHandler(updateBuyerPassword)
);
//----------------------------------------------------------------------------
// @desc    create an address
// @route   POST /api/category/:groupId
// @access  private
//----------------------------------------------------------------------------
// @desc    delete an address
// @route   POST /api/category/:groupId
// @access  private
// @Role    admin

module.exports = router;
