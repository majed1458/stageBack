const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

module.exports.ResetPasswordSendSupplierOTP = (email, otp) => {
  const mailOptions = {
    to: email,
    subject: "Reset password instructions ",
    html: `your confirmation code ${otp}`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent!");
    }
  });
};
