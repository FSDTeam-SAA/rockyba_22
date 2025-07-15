import booking from "./booking.schema";

const createBookingInDb = async (payload: any) => {
  const result = await booking.create(payload);
  
  return result;
};

export const bookingService = {
  createBookingInDb,
};
