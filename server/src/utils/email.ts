import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"UniArchive" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });
        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
