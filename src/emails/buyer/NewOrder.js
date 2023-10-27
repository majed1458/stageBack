const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const SendNewOrderAlert = (email) => {
  const mailOptions = {
    to: email,
    subject: "New order",
    html: `Your has been sent successfully to the store \n will inform you when the store check it.`,
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
module.exports = SendNewOrderAlert;
