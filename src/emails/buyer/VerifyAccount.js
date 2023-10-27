const transporter = require("../../config/nodeMailer");
// ------------------------------------------------------------------
const SendVerifyAccountEmail = (email, token) => {
  const mailOptions = {
    from:'contact@bejomla.com',
    to: email,
    subject: "Verify email instruction",
    html: `http://localhost:3000/auth/email-verification/${token}`,
  };
  transporter.sendMail(mailOptions, (res,error) => {
    if (error) {
      console.log("########################################################");
      console.log(error);
    } else {
      console.log(res);
    }
  });
};
// ------------------------------------------------------------------
module.exports = SendVerifyAccountEmail;
