const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const SendResetPasswordLink = (email, token) => {
  const mailOptions = {
    to: email,
    subject: "Reset password instructions",
    html: `http://localhost:3000/auth/reset-password/${token}`,
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
module.exports = SendResetPasswordLink;
