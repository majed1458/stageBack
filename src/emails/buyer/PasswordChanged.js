const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const PassworUpdated = (email) => {
  const mailOptions = {
    to: email,
    subject: "Password has changed",
    html: `Password has been successfully changed`,
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
module.exports = PassworUpdated;
