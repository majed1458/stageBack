const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const SendResetPasswordLink = (email) => {
  const mailOptions = {
    to: email,
    subject: "Welcome to bejomla",
    html: `Account has been successfully verified \n welcome to bejomla.tn`,
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
