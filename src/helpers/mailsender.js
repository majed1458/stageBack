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

exports.sendVerifEmail = (req, validation) => {
  const mailOptions = {
    from: "piuma.learning@gmail.com",
    to: req.body.email,
    subject: "Confirmation de votre compte",
    html: `
      Bonjour ,
      <strong>cher utilisateur , merci de bien verifier votre compte en cliquant ce lien</strong> ${process.env.CLIENT_URL}/validate/${validation.id}>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ Message: "Failed to send mail !" });
    } else {
      res.status(200).json({ Message: "Check your email for validation!" });
    }
  });
};

module.exports.sendResetLink = (email, id) => {
  const mailOptions = {
    to: email,
    subject: "Reset password instructions ",
    html: `go to ${process.env.CLIENT_URL}/reset/${id} to reset your password`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent!");
    }
  });
};
