const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure:true,
  port: 465,
  auth: {
    user:process.env.GMAIL_USER,
    pass:process.env.GMAIL_SMTP_PASSWORD,
  },
});

console.log("✅ Nodemailer Transporter Initialized");

module.exports = transporter; // ✅ Correct export
