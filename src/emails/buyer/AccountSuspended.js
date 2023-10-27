const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const AccountSuspended = (email) => {
  const mailOptions = {
    to: email,
    subject: "Your account has been suspended",
    html: `Your has been suspended.`,
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
module.exports = AccountSuspended;
