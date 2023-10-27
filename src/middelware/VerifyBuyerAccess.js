const jwt = require("jsonwebtoken");
const Buyer = require("../model/User/User-model");
// -----------------------------------------------------------------------------------------
const verifySupplierAccess = async (req, res, next) => {
  // ** check if there's a token
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ Message: "no token!", Success: false }); // **There's no token
  }
  // ** get the token
  const token = authHeader.split(" ")[1];
  try {
    // ** decode token and verify
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // ** get the supplier with this _id
    const buyer = await Buyer.findOne({
      _id: decoded.user._id,
    });
    // ** add supplier to req
    req.user = buyer;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false, message: "not loged in" });
  }
};
// -----------------------------------------------------------------------------------------
module.exports = verifySupplierAccess;
