const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure:true,
  port: 465,
  auth: {
    user:"kumarbijaybehera07@gmail.com",
    pass:"boqppjebgjanbinl",
  },
});

const mailOptions = {
  from:"kumarbijaybehera07@gmail.com",
  to: "mrmahadev10@gmail.com",
  subject: "SMTP Test Email",
  text: "Hello, this is a test email from SMTP!",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("❌ Error sending test email:", err);
  } else {
    console.log("✅ Test email sent successfully:", info.response);
  }
});
