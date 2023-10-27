"use strict";
const Pack = require("../model/Admin/Pack-model");
//-------------------------------------------
// @desc    create a pack
// @route   POST /api/pack/
// @access  private
// @Role    admin
const createPack = async (req, res) => {
  try {
    const { name, duration, amount, description, published } = req.body;
    if (!name || !description || !amount || !duration) {
      return res
        .status(406)
        .json({ Message: "All informations are required!" });
    }
    let newPack = await Pack.findOne({ name, description, amount, duration });
    if (newPack) {
      return res.status(409).json({ Message: "Similar pack already exists!" });
    }
    newPack = new Pack({
      name,
      duration,
      amount,
      description,
      published,
    });
    const createPack = newPack.save();
    if (!createPack) {
      return res.status(400).json({ Message: "Failed to create pack!" });
    }
    return res
      .status(201)
      .json({ Message: "Pack created successfully!", Pack: newPack });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    publish/unpublish group
// @route   PUT /api/pack/publish/:_id
// @access  private
// @Role    admin
const modifyPublishPack = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Pack id is required!" });
    }
    const { published } = req.body;
    if (published === null || published === undefined) {
      return res.status(406).json({ Message: "Published is required!" });
    }
    const publishedPack = await Pack.findOneAndUpdate(
      { _id },
      { published /*  updateAt: Date.now() */ },
      { new: true }
    );
    if (!publishedPack) {
      return res.status(400).json({
        Message: published
          ? "failed to publish the pack"
          : "Failed to unpublish the pack",
      });
    }
    return res.status(200).json({
      Message: published
        ? "Pack published successfully"
        : "Pack unpublished successfully",
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    update pack
// @route   PUT /api/pack/:_id
// @access  private
// @Role    admin
const updatePack = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Pack id is required!" });
    }
    const { name, duration, amount, description, published } = req.body;
    if (
      !name ||
      !duration ||
      !description ||
      published === null ||
      published === undefined ||
      !amount
    ) {
      return res
        .status(406)
        .json({ Message: "All informations are required!" });
    }
    const updatePack = await Pack.findOneAndUpdate(
      { _id },
      { name, duration, amount, description, published, updatedAt: new Date() },
      { new: true }
    );
    if (!updatePack) {
      return res.status(400).json({ Message: "Failed to update the pack" });
    }
    return res.status(200).json({ Message: "pack updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    delete a pack
// @route   DELETE /api/pack/:_id
// @access  private
// @Role    admin
const deletePack = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Pack id is required!" });
    }
    const removePack = await Pack.remove({ _id });
    if (!removePack) {
      return res.status(400).json({ Message: "Failed to delete group" });
    }
    return res.status(200).json({ Message: "Group deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get a specific group
// @route   GET /api/pack/:_id
// @access  private
// @Role    admin
const getOnePack = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Group id is required" });
    }
    const getPack = await Pack.findOne({ _id });
    if (!getPack) {
      return res
        .status(400)
        .json({ Message: "Failed to retrive", Group: null });
    }
    return res.status(200).json({
      Message: "Retrived successfully",
      Pack: getPack,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get all published packs
// @route   GET /api/pack/published
// @access  private
// @Role    front office
const getPublishedPacks = async (req, res) => {
  try {
    const publishedPack = await Pack.find({ published: true });
    if (!publishedPack) {
      return res.status(400).json({ Message: "Failed to retrive" });
    }
    return res.status(200).json({
      Message: "Retrived successfully",
      Packs: publishedPack,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//----------------------------------------------------------------------
// @desc    get all packs
// @route   GET /api/pack/
// @access  private
// @Role    admin
const getallPacks = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const limit = req.query.l || 10;
    const count = (await Group.find()).length;
    if (!count) {
      return res.status(400).json({ Message: "Failed to count items" });
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
  createPack,
  modifyPublishPack,
  updatePack,
  deletePack,
  getOnePack,
  getPublishedPacks,
  getallPacks,
};
