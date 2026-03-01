import config from "../../config";
import { bookingAdminEmail } from "../../utils/bookingAdminEmail";
import { bookingConfirmationEmail } from "../../utils/bookingConfirmation";
import sendEmail from "../../utils/sendEmail";
import { IBooking } from "./booking.interface";
import booking from "./booking.schema";

const getUniqueRecipients = (recipients: Array<string | undefined>): string[] =>
  Array.from(
    new Set(
      recipients
        .map((recipient) => recipient?.trim())
        .filter((recipient): recipient is string => Boolean(recipient))
    )
  );

const createBookingInDb = async (payload: IBooking) => {
  console.log("payload", payload);
  if (
    payload.appointment.hasPreferredDate === true &&
    (!payload.appointment.preferredDate || !payload.appointment.preferredTime)
  ) {
    throw new Error("Please provide preferred date and time");
  }

  const confirmationRecipients = getUniqueRecipients([
    payload.personalInfo.email,
    config.email.notificationRecipient,
  ]);

  if (!confirmationRecipients.length) {
    throw new Error(
      "No confirmation recipients configured. Set customer email and EMAIL_NOTIFICATION_RECIPIENT."
    );
  }

  // send booking confirmation to customer + configured extra recipient
  await sendEmail({
    to: confirmationRecipients,
    subject: "Booking Confirmation",
    html: bookingConfirmationEmail(payload),
  });

  const adminRecipient = config.email.notificationRecipient || config.email.emailAddress;

  if (!adminRecipient) {
    throw new Error(
      "Admin notification recipient missing. Set EMAIL_NOTIFICATION_RECIPIENT or EMAIL_ADDRESS."
    );
  }

  // send admin notification
  await sendEmail({
    to: adminRecipient,
    subject: "New Booking Notification",
    html: bookingAdminEmail(payload),
  });

  // save to DB
  const result = await booking.create(payload);

  return {
    success: true,
    message: "Booking details sent to your email.",
    bookingId: result._id,
  };
};

const testEmailSetup = async (to?: string) => {
  const recipients = getUniqueRecipients([
    to,
    config.email.notificationRecipient,
    config.email.emailAddress,
  ]);

  if (!recipients.length) {
    throw new Error(
      "No email recipients found. Set EMAIL_ADDRESS and EMAIL_NOTIFICATION_RECIPIENT."
    );
  }

  await sendEmail({
    to: recipients,
    subject: "Email Setup Test",
    html: `
      <h2>Email setup test successful</h2>
      <p>If you received this email, SMTP is configured correctly.</p>
      <p>Time: ${new Date().toISOString()}</p>
    `,
  });

  return {
    success: true,
    recipients,
  };
};

export const bookingService = {
  createBookingInDb,
  testEmailSetup,
};
