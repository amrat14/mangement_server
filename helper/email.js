const sgMail = require("@sendgrid/mail");
const Config = require("../config");
sgMail.setApiKey(Config.EMAIL);
module.exports = function () {
  this.sendEmail = async (email, activationLink) => {
    return new Promise((resolve, reject) => {
      const msg = {
        to: email, // Change to your recipient
        from: "gargamrat14@gmail.com", // Change to your verified sender
        subject: "Welcom",
        text: "To activate you account click below",
        html: `<a href=${activationLink} target="_blank">click here</a>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
          resolve({ success: true });
        })
        .catch((error) => {
          console.error(error);
          resolve({ success: false });
        });
    });
  };
};
