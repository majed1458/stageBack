"use strict";
const Degats = require("../../model/Product/Degat-model");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
//-------------------------------------------
// @desc    create a prodcut
// @route   POST /api/product/
// @access  private
// @Role    admin
const createProduct = async (req, res) => {
  try {
    // * get supplier _id
    const { _id } = req.user;
    if (_id === null || _id === undefined ) {
      return res.status(403).json({ Message: "Not Authorized" });
    }
    // ** get product informations
    const {
      // groupId, // ** Required
      
     
      name, // ** required
      // subDescription, // ** required
      size, // ** Not required    
      dimensions, // ** Not required
      description, // ** Not required
   
      /* additionalInformations, */ // ** Not required

    } = req.body;
    
    if (
      !name  
    ) {
      return res
        .status(406)
        .json({ Message: "Please Provide All Required Informations" });
    }
    // ** Product name must be unique to this store.
    const findNameDuplication = await Degats.findOne({
      name,
      userId:_id,
    });
    if (findNameDuplication) {
      return res.status(422).json({ Message: "Product name must be unique!" });
    }
    
    // ** find any duplication for similar products
    const files = req.files; // Get all files from the request
    let links = [];
    let dimensiens = []
    for (let file of files) {
    const formData = new FormData();

    // Convert buffer to a readable stream before appending
    const fileStream = new require('stream').Readable();
    fileStream.push(file.buffer);
    fileStream.push(null);

    formData.append('files', fileStream, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    // console.log("formData",formData)
    const response = await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          ...formData.getHeaders(),
        }
      });

        console.log("responser",response.data);
        links=response.data.file_url  // Store each file's link
      }
      // hne yeteb3ath el links lel modele ai pour detection des degats
    // **Create a new product
    let newDegats = new Degats({
      userId: _id,
      // groupId,
      name,
      // subDescription,
      link: links,
     
   
      size,
      
      dimensions,
      description,

    
    });
    const createDegat = await newDegats.save();
    console.log("response",createDegat)
    if (!createDegat) {
      return res.status(400).json({ Message: "Failed to create product" });
    }
    // ** Valid
    return res.status(201).json({ Message: "Product created successfully",data:createDegat });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

//--------------------------------------------------------------------------------------
// @desc    update a product
// @route   POST /api/product/:id
// @access  private
// @Role    admin
const updateProduct = async (req, res) => {
  try {
    // ** product _id
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "productId is required!" });
    }
    // ** get informations
    const {
      storeId,
      published,
      groupId,
      categoryId,
      subCategoryId,
      name,
      subDescription,
      description,
      additionalInformations,
      delivery,
      deliveryDescription,
      galery,
      quantity,
      minPurchaseQuantity,
      minPrice,
      maxPrice,
      discount,
      size,
      colors,
      dimensions,
      available,
    } = req.body;
    if (
      !groupId ||
      !categoryId ||
      !name ||
      !subDescription ||
      galery.length < 1 ||
      !quantity ||
      !minPrice
    ) {
      return res
        .status(406)
        .json({ Message: "Please Provide All Required Information!" });
    }
    // ** check if the product name is already used in this store.
    const findNameDuplication = await Degats.findOne({ name, storeId });
    if (findNameDuplication) {
      return res.status(422).json({ Message: "Product name must be unique!" });
    }
    // ** update that product
    const updateProduct = await Degats.findOneAndUpdate(
      { _id },
      {
        published,
        groupId,
        categoryId,
        subCategoryId,
        name,
        subDescription,
        description,
        additionalInformations,
        delivery,
        deliveryDescription,
        galery,
        quantity,
        minPurchaseQuantity,
        minPrice,
        maxPrice,
        discount,
        size,
        colors,
        dimensions,
        available,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(400).json({ Message: "Failed to update product" });
    }
    // ** valid
    return res.status(200).json({ Message: "Product updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//--------------------------------------------------------------------------------------
// @desc    publish/unpublish product
// @route   PUT /api/product/publish/:_id
// @access  private
// @Role    admin
const publishProduct = async (req, res) => {
  try {
    // ** product id
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "productId is required!" });
    }
    // ** published: true || false
    const { published } = req.body; //boolean
    if (published !== false || published !== true) {
      return res.status(406).json({ Message: "published is required!" });
    }
    // ** Check if store is activated or not.
    // ** Update product
    const publishProduct = await Degats.findOneAndUpdate(
      { _id },
      { published },
      { new: true }
    );
    if (!publishProduct) {
      return res.status(400).json({
        Message: published
          ? "failed to published product"
          : "failed to hide product",
      });
    }
    // ** Valid
    return res.status(200).json({
      Message: published
        ? "Product is published now"
        : "Product is invisible now",
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//--------------------------------------------------------------------------------------
// @desc    increment/Decrement product
// @route   POST /api/product/:id
// @access  private
// @Role    admin
const updateProductStock = async (req, res) => {
  try {
    // ** product id
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "productId is required!" });
    }
    // ** get quantity
    const { quantity } = req.body;
    if (!quantity) {
      return res
        .status(406)
        .json({ Message: "Please provide all required informations!" });
    }
    // ** update quantity
    const updateProduct = await Degats.findOneAndUpdate(
      { _id },
      { quantity },
      { new: true }
    );
    if (!updateProduct) {
      return res
        .status(400)
        .json({ Message: "Failed to update product quantity" });
    }
    // ** Valid
    return res.status(200).json({ Message: "Quantity updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

//--------------------------------------------------------------------------------------
// @desc    delete a product
// @route   DELETE /api/product/:id
// @access  private
// @Role    admin
const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "productId is required!" });
    }
    const deleteProduct = await Degats.remove({ _id });
    if (!deleteProduct) {
      return res
        .status(400)
        .json({ Message: "failed to remove", Success: false });
    }
    return res
      .status(200)
      .json({ Message: "Deleted successfully", Success: true });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//--------------------------------------------------------------------------------------
// @desc    get one product
// @route   POST /api/product/
// @access  private
// @Role    supplier
const getOneProductBackOffice = async (req, res) => {
  try {
    // ** Product id
    const { _id } = req.params;
    if (_id === null || _id === undefined) {
      return res.status(406).json({ Message: "Please provide product id" });
    }
    // ** Retrive product
    const getProduct = await Degats.findOne({ _id });
    if (!getProduct) {
      return res.status(400).json({ Message: "Product doesn't exist" });
    }
    // ** valid
    return res
      .status(200)
      .json({ Message: "Retrived successfully", item: getProduct });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//--------------------------------------------------------------------------------------
// @desc    get all products
// @route   POST /api/product/
// @access  private
// @Role    supplier
const getStoreProducts = async (req, res) => {
  try {
    // ** get supplier _id from req
    const { _id, storeId } = req.supplier;
    if (!_id || !storeId) {
      return res.status(406).json({ Message: "Missing required userId" });
    }
    const page = req.query.p || 0; // ** page number
    const limit = req.query.l || 10; // ** page limit
    // ** count all products
    const count =
      (await Degats.find({ supplierId: _id, storeId })).length || 0;
    // ** get supplier products
    const items = await Degats.find({ supplierId: _id, storeId })
      .skip(page * limit)
      .limit(limit);
    // ** count published products
    const publishedSize = (await Degats.find({ published: true })).length || 0;
    // ** count available products
    const availableSize = (await Degats.find({ available: true })).length || 0;
    // ** count unavailable products
    const unAvailableSize =
      (await Degats.find({ available: false })).length || 0;
    // ** valid
    return res.status(200).json({
      Message: "Retrived successfully",
      count: count === null ? 0 : count, // ** number of products
      items: items === null ? [] : items, // ** list of products
      offset: page * limit, // ** offset
      size: items === null ? 0 : items.length, // ** number of products retrived
      publishedSize: publishedSize === null ? 0 : publishedSize, // **number of published products
      availableSize: availableSize === null ? 0 : availableSize, // **Number of products available
      unAvailableSize: unAvailableSize === null ? 0 : unAvailableSize, // **number of products unavailable
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//--------------------------------------------------------------------------------------
module.exports = {
  createProduct,
  updateProduct,
  publishProduct,
  updateProductStock,
  deleteProduct,
  updateProductStock,
  deleteProduct,
  getOneProductBackOffice,
  getStoreProducts,
};
