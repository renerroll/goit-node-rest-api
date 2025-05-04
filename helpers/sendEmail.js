import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { BASE_URL, MAIL_USERNAME, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT } =
  process.env;

const nodemailerConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (to, verificationToken) => {
  const emailOptions = {
    from: MAIL_USERNAME,
    to,
    subject: "Verify your email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await transport.sendMail(emailOptions);
};

export default sendEmail;
