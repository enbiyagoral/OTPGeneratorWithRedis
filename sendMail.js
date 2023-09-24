const nodemailer = require('nodemailer');
const Mailgen = require("mailgen");
const dotenv = require('dotenv');
dotenv.config();

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS,
    },
  };
  
let transporter = nodemailer.createTransport(nodeConfig);
  
let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
});
  
const registerMail = async (username, useremail, otp , subject) => {
    try {
      var email = {
        body: {
          name: username,
          intro:
            otp ||
            "Welcome OTP Service", 
          outro:
            "Welcome OTP Service! Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      };
  
      var emailBody = MailGenerator.generate(email);
  
      let message = {
        from: process.env.MAIL_USER,
        to: useremail,
        subject: subject || "Sended OTP",
        html: emailBody,
      };
  
      // send mail
      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          return false;
        }
  
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      return true;
    } catch (err) {
      console.log(err, "in sending email");
      return false;
    }
};
  
module.exports = { registerMail };