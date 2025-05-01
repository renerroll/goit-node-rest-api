import nodemailer from 'nodemailer';
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: process.env.URK_NET_EMAIL,
        pass: process.env.URK_NET_PASSWORD,
    },
});

export const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.URK_NET_EMAIL,
        to: email,
        subject: 'Verification Email',
        html: `<a href="${process.env.HOST}:${process.env.PORT}/api/auth/verify/${token}" target="_blank">Verify your email</a>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default {
    sendVerificationEmail,
};