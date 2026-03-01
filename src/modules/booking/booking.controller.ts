import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResonse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createbooking = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await bookingService.createBookingInDb(req.body);

  sendResonse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Booking successfully",
    data: result,
  });
});

const testEmailSetup = catchAsync(async (req, res) => {
  const to = typeof req.query.to === "string" ? req.query.to : undefined;
  const result = await bookingService.testEmailSetup(to);

  sendResonse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Test email sent successfully",
    data: result,
  });
});

export const bookingController = {
  createbooking,
  testEmailSetup,
};
