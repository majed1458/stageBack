const mongoose = require("mongoose");
// ---------------------------------------------------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connceted");
  } catch (err) {
    console.log("Failed to connect");
    console.log(err.message);
    process.exit(1);
  }
};
// ---------------------------------------------------------------
module.exports = connectDB;
