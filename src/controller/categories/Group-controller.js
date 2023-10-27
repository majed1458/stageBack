"use strict";
const Group = require("../../model/Roups/Groups-model");
// const Category = require("../../model/Categories/Category-model");
//-------------------------------------------
// @desc    create a group
// @route   POST /api/group/
// @access  private
// @Role    admin
const createGroup = async (req, res) => {
  try {
    const { name, icone, description, published } = req.body;
    if (
      !name ||
      !icone ||
      !description ||
      published === null ||
      published === undefined
    ) {
      return res
        .status(406)
        .json({ Message: "All informations are required!" });
    }
    let newGroup = await Group.findOne({ name, icone, description });
    if (newGroup) {
      return res.status(409).json({ Message: "Similar group already exists" });
    }
    newGroup = new Group({
      name,
      icone,
      description,
      published,
    });
    const createGroup = newGroup.save();
    if (!createGroup) {
      return res.status(400).json({ Message: "Failed to create group" });
    }
    return res.status(201).json({
      Message: "Group created successfully",
      Category: newGroup,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    publish/unpublish group
// @route   PUT /api/group/publish/:_id
// @access  private
// @Role    admin
const modifypublishGroup = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "group id is required!" });
    }
    const { published } = req.body;
    if (published === null || published === undefined) {
      return res.status(406).json({ Message: "Published is required!" });
    }
    const publishedGroup = await Group.findOneAndUpdate(
      { _id },
      { published, updateAt: new Date() },
      { new: true }
    );
    if (!publishedGroup) {
      return res.status(400).json({
        Message: published
          ? "failed to publish the group"
          : "Failed to unpublish the group",
      });
    }
    return res.status(200).json({
      Message: published
        ? "Group published successfully"
        : "Group unpublished successfully",
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    update group
// @route   PUT /api/group/:_id
// @access  private
// @Role    admin
const updateGroup = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "group id is required!" });
    }
    const { name, icone, description, published } = req.body;
    if (
      !name ||
      !icone ||
      !description ||
      published === null ||
      published === undefined
    ) {
      return res
        .status(406)
        .json({ Message: "All informations are required!" });
    }
    const updateGroup = await Group.findOneAndUpdate(
      { _id },
      { name, icone, description, published, updatedAt: new Date() },
      { new: true }
    );
    if (!updateGroup) {
      return res.status(400).json({ Message: "Failed to update the group" });
    }
    return res.status(200).json({ Message: "group updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    delete a group
// @route   DELETE /api/group/:_id
// @access  private
// @Role    admin
const deleteGroup = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "group is is required!" });
    }
    const removeGroup = await Group.remove({ _id });
    if (!removeGroup) {
      return res.status(400).json({ Message: "Failed to delete group" });
    }
    return res.status(200).json({ Message: "Group deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get categories related to this group
// @route   GET /api/group/published
// @access  private
// @Role    admin
const getThisGroupCategories = async (req, res) => {
  try {
    const { groupId } = req.params;
    if (groupId === null || groupId === undefined) {
      return res.status(404).send({ Message: "Missing required groupId" });
    }
    // const groupCategories = await Category.find({ groupId });
    return res
      .status(200)
      .json({ Message: "Retrived successfully", Categories: groupCategories });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send("Server Error");
  }
};
//----------------------------------------------------------------------
// @desc    get a specific group
// @route   GET /api/group/:_id
// @access  private
// @Role    admin
const getOneGroup = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Group id is required" });
    }
    const getGroup = await Group.findOne({ _id });
    if (!getGroup) {
      return res
        .status(400)
        .json({ Message: "Failed to retrive", Group: null });
    }
    return res.status(200).json({
      Message: "Retrived successfully",
      Group: getGroup,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get all published groups
// @route   GET /api/group/published
// @access  private
// @Role    admin
const getPublishedGroups = async (req, res) => {
  try {
    const publishedGroups = await Group.find({ published: true });
    if (!publishedGroups) {
      return res.status(400).json({ Message: "Failed to retrive" });
    }
    return res.status(200).json({
      Message: "Retrived successfully",
      Groups: publishedGroups,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const getPublishedGroupsdetailed = async (req, res) => {
  try {
    const getPublishedGroups = await Group.find({ published: true }).populate({
      path: "cathegories",
      published: true,
      populate: {
        path: "subcats",
      },
    });
    return res.status(200).json({
      Message: "Retrived successfully",
      items: getPublishedGroups === null ? [] : getPublishedGroups,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get all groups
// @route   GET /api/group/
// @access  private
// @Role    admin
const getallGroups = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    const count = (await Group.find()).length;
    if (!count) {
      return res.status(400).json({ Message: "Failed to retrive" });
    }
    const items = await Group.find()
      .skip(page * limit)
      .limit(limit);
    if (!items) {
      return res.status(400).json({ Message: "Failed to retrive items" });
    }
    return res.status(200).json({
      Message: "Retrived successfully",
      count,
      items,
      offset: page * limit,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
module.exports = {
  createGroup,
  modifypublishGroup,
  updateGroup,
  deleteGroup,
  getOneGroup,
  getPublishedGroups,
  getallGroups,
  getThisGroupCategories,
  getPublishedGroupsdetailed,
};
