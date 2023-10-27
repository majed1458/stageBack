const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// const schedule = require("node-schedule");
// const StorePack = require("./src/model/Store/StorePack-model");
// const Product = require("./src/model/Product/Product-model");
//------------------------------------------------
const app = express();
const router = require("./src/routes/all-routes");
const connectDB = require("./src/config/DB");
//------------------------------------------------
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//------------------------------------------------
require("dotenv").config();
connectDB();
// //------------------------------------------------
// const rule = new schedule.RecurrenceRule();
// rule.date = 2;
// rule.hour = 3;
// rule.minute = 31;

// const job = schedule.scheduleJob(rule, function () {
//   console.log("i m here1");

//   StorePack.find({ activated: true, expiresAt: new Date() })
//     .populate({ path: "storeId", select: "published" })
//     .exec(async (err, storePacks) => {
//       console.log("i m here");
//       if (storePacks.length > 0) {
//         console.log(storePacks);
//         storePacks.forEach(async (store) => {
//           store.activated = flase;
//           storePacks.storeId.published = false;
//           Product.updateMany(
//             { storeId: store._id },
//             { $set: { published: false } }
//           ).then(() => {
//             store.save();
//           });
//         });
//       }
//       if (storePacks.length == 0) {
//         console.log("there is no stores");
//       }
//       if (err) {
//         console.log(err);
//       }
//     });
// });

app.use("/api/", router);
app.use("*", (req, res) => {
  res.status(404).send("This route doesnt exist");
});
//------------------------------------------------
app.listen(8080, () => {
  console.log("listenning on port : 8080");
});
