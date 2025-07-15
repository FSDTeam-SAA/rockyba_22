import config from "../config";
import nodemailer from "nodemailer";

interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: SendEmailPayload) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.email.emailAddress,
        pass: config.email.emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: config.email.emailAddress,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export default sendEmail;
