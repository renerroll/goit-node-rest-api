import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const nodemailerConfig = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationURL = `${DOMAIN}/auth/verify/${verificationToken}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the following link: ${verificationURL}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export default sendVerificationEmail;