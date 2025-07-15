import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/create-booking", bookingController.createbooking);

export const bookingRouter = router;
