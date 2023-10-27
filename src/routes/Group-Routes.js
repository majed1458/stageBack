const express = require("express");
const asyncHandler = require("express-async-handler");
//----------------------------------------------------------------------------
const {
  createGroup,
  modifypublishGroup,
  updateGroup,
  deleteGroup,
  getOneGroup,
  getPublishedGroups,
  getallGroups,
  getThisGroupCategories,
  getPublishedGroupsdetailed,
} = require("../controller/categories/Group-controller");
const router = express.Router();
//----------------------------------------------------------------------------
// @desc    create a group
// @route   POST /api/group/
// @access  private
// @Role    admin
router.post("/", asyncHandler(createGroup));
//----------------------------------------------------------------------
// @desc    get all groups
// @route   GET /api/group/
// @access  private
// @Role    admin
router.get("/published", asyncHandler(getPublishedGroups));
//----------------------------------------------------------------------
// @desc    get all details groups
// @route   GET /api/group/
// @access  private
// @Role    admin
router.get("/getdetailedgroups", getPublishedGroupsdetailed);
//----------------------------------------------------------------------------
// @desc    publish/unpublish group
// @route   PUT /api/group/publish/:_id
// @access  private
// @Role    admin
router.put("/publish/:_id", asyncHandler(modifypublishGroup));
//----------------------------------------------------------------------------
// @desc    update group
// @route   PUT /api/group/:_id
// @access  private
// @Role    admin
router.put("/:_id", asyncHandler(updateGroup));
//----------------------------------------------------------------------------
// @desc    delete a group
// @route   DELETE /api/group/:_id
// @access  private
// @Role    admin
router.delete("/:_id", asyncHandler(deleteGroup));
//----------------------------------------------------------------------------
// @desc    get a specific group
// @route   GET /api/group/:_id
// @access  private
// @Role    admin
router.get("/categories/:groupId", asyncHandler(getThisGroupCategories));
//----------------------------------------------------------------------------
// @desc    get a specific group
// @route   GET /api/group/:_id
// @access  private
// @Role    admin
router.get("/:_id", asyncHandler(getOneGroup));
//----------------------------------------------------------------------------
// @desc    get all published groups
// @route   GET /api/group/published
// @access  private
// @Role    admin
//----------------------------------------------------------------------------
// @desc    get all groups
// @route   GET /api/group/
// @access  private
// @Role    admin
router.get("/", asyncHandler(getallGroups));
//----------------------------------------------------------------------------
module.exports = router;
