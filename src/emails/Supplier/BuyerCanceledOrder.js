const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const BuyerCanceledOrder = (email) => {
  const mailOptions = {
    to: email,
    subject: "Buyer has canceled the order",
    html: `Buyer has cancelled the order`,
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
module.exports = BuyerCanceledOrder;
