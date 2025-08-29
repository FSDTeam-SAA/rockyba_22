import config from "../../config";
import { bookingAdminEmail } from "../../utils/bookingAdminEmail";
import { bookingConfirmationEmail } from "../../utils/bookingConfirmation";
import sendEmail from "../../utils/sendEmail";
import { IBooking } from "./booking.interface";
import booking from "./booking.schema";

const createBookingInDb = async (payload: IBooking) => {
  console.log("payload",payload);
  if (
    payload.appointment.hasPreferredDate === true &&
    (!payload.appointment.preferredDate || !payload.appointment.preferredTime)
  ) {
    throw new Error("Please provide preferred date and time");
  }

  // send email to customer
  await sendEmail({
    to: payload.personalInfo.email,
    subject: "Booking Confirmation",
    html: bookingConfirmationEmail(payload),
  });

  // send email to admin
  await sendEmail({
    to: config.email.emailAddress as string,
    subject: "New Booking Notification",
    html: bookingAdminEmail(payload),
  });

if (
  payload.appointment.hasPreferredDate === true &&
  (!payload.appointment.preferredDate || !payload.appointment.preferredTime)
) {
  throw new Error('Please provide preferred date and time')
}
  // save to DB
  const result = await booking.create(payload);

  return {
    success: true,
    message: "Booking details sent to your email.",
    bookingId: result._id,
  };
};

export const bookingService = {
  createBookingInDb,
};
