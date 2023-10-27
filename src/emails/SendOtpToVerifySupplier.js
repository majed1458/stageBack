const nodeMailer = require("nodemailer");
const transporter= require("../config/nodeMailer")
// const transporter = nodeMailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASSWORD,
//   },
//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false,
//   },
// });

module.exports.SendOtpToVerifySupplier = (email, otp) => {
  const mailOptions = {
    to: email,
    subject: "Verification code",
    html: `your confirmation code ${otp}`,
  };
  transporter.sendMail(mailOptions, (res,error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(res);
    }
  });
};
