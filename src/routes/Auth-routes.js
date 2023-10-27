const express = require("express");
const asyncHandler = require("express-async-handler");
//----------------------------------------------------------------------------
const {
  signUpBuyer,
  getBuyerByToken,
  signInBuyer,
  forgotBuyerPassword,
  verifyBuyerAccount,
  resetBuyerPassword,
  resendBuyerVerificationLink,
} = require("../controller/User/User-auth-controller");
//----------------------------------------------------------------------------
// **Middleware
const verifyBuyerAccess = require("../middelware/VerifyBuyerAccess");
//----------------------------------------------------------------------------
const router = express.Router();
//----------------------------------------------------------------------------
// @desc    login supplier
// @route   POST /api/auth/supplier/signin
// @access  public
// @Role    client
router.post(
  "/sign-in",
  /* asyncHandler(verifyBuyerAccess), */
  asyncHandler(signInBuyer)
);
router.get(
  "/me",
  asyncHandler(verifyBuyerAccess),
  asyncHandler(getBuyerByToken)
);
//----------------------------------------------------------------------------
// @desc    signup supplier
// @route   POST /api/auth/supplier/signin
// @access  public
// @Role    client
router.post("/sign-up", asyncHandler(signUpBuyer));
//----------------------------------------------------------------------------
// @desc    forgot password.
// @route   POST /api/auth/supplier/forgot-password
// @access  public
// @Role    client
router.post("/forgot-password", asyncHandler(forgotBuyerPassword));
//----------------------------------------------------------------------------
// @desc    reset buyer password
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
router.put("/reset", asyncHandler(resetBuyerPassword));
//----------------------------------------------------------------------------
// @desc    verify account
// @route   PUT /api/auth/forgotPassword
// @access  public
// @Role    client
router.put("/verify", asyncHandler(verifyBuyerAccount));
//----------------------------------------------------------------------------
// @desc    resend verification mail
// @route   PUT /api/auth/forgotPassword
// @access  public
// @Role    client
router.post("/resend", asyncHandler(resendBuyerVerificationLink));
//----------------------------------------------------------------------------
// @desc    validate buyer
// @route   POST /api/auth/forgotPassword
// @access  public
// @Role    client
// router.post(
//   "/validate",
//   asyncHandler(verifyBuyerAccess),
//   asyncHandler(getBuyerByToken)
// );
//----------------------------------------------------------------------------
module.exports = router;
