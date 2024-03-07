
const nodemailer = require("nodemailer");
const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
    //   host: process.env.MAIL_HOST,
      service:"gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", info);
    return { success: true, response: info };
  } catch (error) {
    console.error("Error occurred while sending email:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
