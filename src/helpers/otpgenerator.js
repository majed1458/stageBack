const GenerateOTP5 = () => {
  let otp = "";
  for (let i = 0; i < 5; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const GeneratePassAcees = () => {
  let access = "";
  for (let i = 0; i < 8; i++) {
    access += Math.floor(Math.random() * 10);
  }
  return access;
};

module.exports = {
  GenerateOTP5,
  GeneratePassAcees,
};
