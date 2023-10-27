const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require('multer');
//----------------------------------------------------------------------------
const {
  createProduct,
  updateProduct,
  publishProduct,
  makeProductAvailable,
  deleteProduct,
  updateProductStock,
  getOneProductBackOffice,
  getUserProducts,
  getAllProducts,
} = require("../controller/product/files-controller");

// ** supplier access
const verifyBuyerAccess = require("../middelware/VerifyBuyerAccess");
const router = express.Router();
const upload = multer();
// ** ------------------------------------------------------------------------
// ** BackOffice
// @desc    create a prodcut
// @route   POST /api/product/create
// @access  private
// @Role    supplier
router.post(
  "/create",
  asyncHandler(verifyBuyerAccess),
  upload.array('files', 5),  // Handle 4-5 files
  asyncHandler(createProduct)
);
//----------------------------------------------------------------------------
// @desc    update a product
// @route   POST /api/product/:_id
// @access  private
// @Role    supplier
// router.put("/update/:_id", asyncHandler(updateProduct));
//----------------------------------------------------------------------------
// @desc    publish/unpublish products
// @route   PUT /api/product/publish/:_id
// @access  private
// @Role    supplier
// router.put("/update/publish/:_id", asyncHandler(publishProduct));
//----------------------------------------------------------------------------
// @desc    make product available/unavailable
// @route   PUT /api/product/available/:_id
// @access  private
// @Role    supplier
// router.put("/update/available/:_id", asyncHandler(makeProductAvailable));
//----------------------------------------------------------------------------
// @desc    increment/decrement quantity
// @route   PUT /api/product/available/:_id
// @access  private
// @Role    supplier
// router.put("/update/quantity/:_id", asyncHandler(updateProductStock));
//----------------------------------------------------------------------------
// @desc    Delete a produc
// @route   DELETE /api/product/:_id
// @access  private
// @Role    suppliers
// router.delete("/delete/:_id", asyncHandler(deleteProduct));
//----------------------------------------------------------------------------
// @desc    get user products
// @route   GET /api/product/user/:_id
// @access  private
// @Role    supplier
//----------------------------------------------------------------------------
// @desc    get product in backOffice
// @route   DELETE /api/product/:_id
// @access  private
// @Role    suppliers
// router.get("/one/backoffice/:_id", asyncHandler(getOneProductBackOffice));
// ** ------------------------------------------------------------------------
// ** Ecommerce
// @desc    get products filter options
// @route   GET /api/product/:id
// @access  private
// @Role    frontoffice
//----------------------------------------------------------------------------
// @desc    get all published products
// @route   GET /api/product/:id
// @access  private
// @Role    frontoffice
//----------------------------------------------------------------------------
// @desc    get product by search bar
// @route   GET /api/product/:_id
// @access  private
// @Role    all roles
//----------------------------------------------------------------------------
// @desc    get store published products
// @route   GET /api/product/user/:_id
// @access  private
// @Role    supplier
//----------------------------------------------------------------------------
// @desc    get a specific product for ecommerce
// @route   GET /api/product/:_id
// @access  private
// @Role    all roles
//----------------------------------------------------------------------------
// @desc    get groups category
// @route   GET /api/product/categories/:groupId
// @access  private
// @Role    ecommerce
//----------------------------------------------------------------------------
// @desc    get groups category
// @route   GET /api/product/subCategories/:groupId
// @access  private
// @Role    ecommerce

// ** ------------------------------------------------------------------------
// ** Admin
// @desc    get all products
// @route   GET /api/product/
// @access  private
// @Role    admin
router.get("/all", asyncHandler(getAllProducts));
//----------------------------------------------------------------------------
module.exports = router;
