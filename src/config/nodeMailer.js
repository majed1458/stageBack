const nodeMailer = require("nodemailer");
// ---------------------------------------------
const transporter = nodeMailer.createTransport({
  // service: "gmail",
  host: "ssl0.ovh.net",
   port: 587 , 
  secure: false,
  auth: {
    user: "skander@ozoneconnect.io",
    pass: "Skander@2022",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: true,
  },
});
// ---------------------------------------------
module.exports = transporter;
