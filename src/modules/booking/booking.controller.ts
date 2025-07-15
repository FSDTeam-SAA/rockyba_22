import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createbooking = catchAsync(async (req, res) => {
  const result = await bookingService.createBookingInDb(req.body);

  sendResonse(res, {
    statusCode: 200,
    success: true,
    message: "Booking successfully",
    data: result,
  });
});

export const bookingController = {
  createbooking,
};
