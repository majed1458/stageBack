const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const StoreCancelledOrder = (email) => {
  const mailOptions = {
    to: email,
    subject: "Store has cancelled your order",
    html: `Ths store has cancelled your order`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("########################################################");
      console.log(error);
    } else {
      console.log("Message sent!");
    }
  });
};
// ---------------------------------------------
module.exports = StoreCancelledOrder;
