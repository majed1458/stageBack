const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const SendResetPasswordLink = (email) => {
  const mailOptions = {
    to: email,
    subject: "Welcome to bejomla",
    html: `The store has accepted your order and it's been procceed now`,
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
