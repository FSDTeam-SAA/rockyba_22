import config from "../config";
import nodemailer from "nodemailer";

interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
}

const sendEmail = async ({ to, subject, html }: SendEmailPayload) => {
  const smtpUser = config.email.emailAddress;
  const smtpPass = config.email.emailPass;

  if (!smtpUser || !smtpPass) {
    throw new Error(
      "Email configuration missing. Set EMAIL_ADDRESS and EMAIL_PASSWORD in .env"
    );
  }

  const recipients = Array.isArray(to) ? to : [to];
  const validRecipients = recipients
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item));

  if (!validRecipients.length) {
    throw new Error("No valid recipient email address provided.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpUser,
    to: validRecipients.join(","),
    subject,
    html,
  });
};

export default sendEmail;
