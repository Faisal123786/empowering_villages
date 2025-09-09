import nodemailer from 'nodemailer';

const emailSender = (...emaildata) => {
const [email, html] = emaildata;
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

(async () => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome in Empowering Villages",
    html:html,
  });

  console.log("Message sent:", info.messageId);
})();
}


export default {emailSender};