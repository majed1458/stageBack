const transporter = require("../../config/nodeMailer");
// ---------------------------------------------
const StoreDeclinedOrder = (email) => {
  const mailOptions = {
    to: email,
    subject: "Welcome to bejomla",
    html: `The store has declined your order.`,
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
module.exports = StoreDeclinedOrder;
