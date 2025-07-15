import { IBooking } from "./booking.interface";
import booking from "./booking.schema";

const createBookingInDb = async (payload: IBooking) => {
  const result = await booking.create(payload);
  return result;
};

export const bookingService = {
  createBookingInDb,
};
