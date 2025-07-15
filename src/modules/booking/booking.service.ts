import config from "../../config";
import { bookingConfirmationEmail } from "../../utils/bookingConfirmation";
import sendEmail from "../../utils/sendEmail";
import { IBooking } from "./booking.interface";
import booking from "./booking.schema";

const createBookingInDb = async (payload: IBooking) => {
  if (
    payload.appointment.hasPreferredDate === true &&
    (!payload.appointment.preferredDate || !payload.appointment.preferredTime)
  ) {
    throw new Error("Please provide preferred date and time");
  }

  const recipients = [
    payload.personalInfo.email,
    config.email.emailAddress,
  ].join(",");

  await sendEmail({
    to: recipients,
    subject: "Booking Confirmation",
    html: bookingConfirmationEmail(payload),
  });

  const result = await booking.create(payload);
  return result;
};

export const bookingService = {
  createBookingInDb,
};
